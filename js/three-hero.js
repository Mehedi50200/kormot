import * as THREE from "three";

/**
 * kormot hero — an interactive particle sphere driven by a custom
 * simplex-noise vertex shader. Reacts to pointer, pauses off-screen,
 * caps pixel ratio, and respects reduced-motion preferences.
 */
export function initHero(canvas) {
  if (!canvas) return null;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 720px)").matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 4.2);

  // ---- geometry: points distributed on a sphere ----
  const COUNT = isMobile ? 9000 : 22000;
  const positions = new Float32Array(COUNT * 3);
  const randoms = new Float32Array(COUNT);
  const scales = new Float32Array(COUNT);

  for (let i = 0; i < COUNT; i++) {
    // fibonacci sphere for even distribution
    const t = i / COUNT;
    const phi = Math.acos(1 - 2 * t);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 1.5;
    positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    randoms[i] = Math.random();
    scales[i] = Math.random() * 0.8 + 0.2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

  const uniforms = {
    uTime: { value: 0 },
    uSize: { value: isMobile ? 14 : 20 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorA: { value: new THREE.Color("#d6ff3e") },
    uColorB: { value: new THREE.Color("#5a7dff") },
    uColorC: { value: new THREE.Color("#ffffff") },
    uAmp: { value: 0 }, // animated in on load
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uSize;
      uniform float uPixelRatio;
      uniform vec2 uMouse;
      uniform float uAmp;
      attribute float aRandom;
      attribute float aScale;
      varying float vNoise;
      varying float vDist;

      // --- simplex noise (Ashima) ---
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
      float snoise(vec3 v){
        const vec2 C=vec2(1.0/6.0,1.0/3.0);
        const vec4 D=vec4(0.0,0.5,1.0,2.0);
        vec3 i=floor(v+dot(v,C.yyy));
        vec3 x0=v-i+dot(i,C.xxx);
        vec3 g=step(x0.yzx,x0.xyz);
        vec3 l=1.0-g;
        vec3 i1=min(g.xyz,l.zxy);
        vec3 i2=max(g.xyz,l.zxy);
        vec3 x1=x0-i1+1.0*C.xxx;
        vec3 x2=x0-i2+2.0*C.xxx;
        vec3 x3=x0-1.0+3.0*C.xxx;
        i=mod(i,289.0);
        vec4 p=permute(permute(permute(
          i.z+vec4(0.0,i1.z,i2.z,1.0))
          +i.y+vec4(0.0,i1.y,i2.y,1.0))
          +i.x+vec4(0.0,i1.x,i2.x,1.0));
        float n_=1.0/7.0;
        vec3 ns=n_*D.wyz-D.xzx;
        vec4 j=p-49.0*floor(p*ns.z*ns.z);
        vec4 x_=floor(j*ns.z);
        vec4 y_=floor(j-7.0*x_);
        vec4 x=x_*ns.x+ns.yyyy;
        vec4 y=y_*ns.x+ns.yyyy;
        vec4 h=1.0-abs(x)-abs(y);
        vec4 b0=vec4(x.xy,y.xy);
        vec4 b1=vec4(x.zw,y.zw);
        vec4 s0=floor(b0)*2.0+1.0;
        vec4 s1=floor(b1)*2.0+1.0;
        vec4 sh=-step(h,vec4(0.0));
        vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
        vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
        vec3 p0=vec3(a0.xy,h.x);
        vec3 p1=vec3(a0.zw,h.y);
        vec3 p2=vec3(a1.xy,h.z);
        vec3 p3=vec3(a1.zw,h.w);
        vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
        p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
        vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
        m=m*m;
        return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
      }

      void main() {
        vec3 pos = position;
        float t = uTime * 0.18;

        // layered noise displacement -> organic morphing surface
        float n = snoise(pos * 1.1 + vec3(t));
        n += 0.5 * snoise(pos * 2.3 + vec3(t * 1.4));
        vNoise = n;

        vec3 dir = normalize(pos);
        float displace = n * 0.42 * uAmp;

        // pointer ripple
        float m = sin(uMouse.x * 3.14159 + pos.y * 2.0) * cos(uMouse.y * 3.14159 + pos.x * 2.0);
        displace += m * 0.18 * uAmp;

        pos += dir * displace;

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        vDist = -mv.z;
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / vDist);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform vec3 uColorC;
      varying float vNoise;
      varying float vDist;

      void main() {
        // round, soft points
        float d = distance(gl_PointCoord, vec2(0.5));
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.0, d);

        // color by noise band
        float n = clamp(vNoise * 0.5 + 0.5, 0.0, 1.0);
        vec3 col = mix(uColorB, uColorA, smoothstep(0.35, 0.75, n));
        col = mix(col, uColorC, smoothstep(0.82, 1.0, n));

        // depth fade
        float fog = smoothstep(7.5, 2.0, vDist);
        gl_FragColor = vec4(col, alpha * fog * 0.9);
      }
    `,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // ---- pointer ----
  const mouseTarget = new THREE.Vector2(0, 0);
  const mouse = new THREE.Vector2(0, 0);
  function onPointer(e) {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -((e.clientY / window.innerHeight) * 2 - 1);
    mouseTarget.set(x, y);
  }
  window.addEventListener("pointermove", onPointer, { passive: true });

  // ---- resize ----
  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  // ---- visibility pause ----
  let visible = true;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => (visible = en.isIntersecting)),
    { threshold: 0 }
  );
  io.observe(canvas);

  // ---- intro amplitude tween ----
  let ampStart = performance.now() + 250;

  // ---- loop ----
  const clock = new THREE.Clock();
  let raf;
  function tick() {
    raf = requestAnimationFrame(tick);
    if (!visible) return;

    const elapsed = clock.getElapsedTime();
    uniforms.uTime.value = elapsed;

    // ease amplitude in
    const a = Math.min(1, Math.max(0, (performance.now() - ampStart) / 1400));
    uniforms.uAmp.value = reduced ? 1 : a * a * (3 - 2 * a);

    // smooth pointer
    mouse.lerp(mouseTarget, 0.05);
    uniforms.uMouse.value.copy(mouse);

    // gentle auto-rotation + pointer parallax
    if (!reduced) {
      points.rotation.y = elapsed * 0.05 + mouse.x * 0.3;
      points.rotation.x = mouse.y * -0.2 + Math.sin(elapsed * 0.1) * 0.05;
    } else {
      points.rotation.y = elapsed * 0.02;
    }

    renderer.render(scene, camera);
  }
  tick();

  function setTheme(theme) {
    if (theme === "light") {
      uniforms.uColorA.value.set("#cdee3a"); // same lime as .btn--primary
      uniforms.uColorB.value.set("#5a7dff");
      uniforms.uColorC.value.set("#cdee3a");
      material.blending = THREE.NormalBlending;
    } else {
      uniforms.uColorA.value.set("#d6ff3e");
      uniforms.uColorB.value.set("#5a7dff");
      uniforms.uColorC.value.set("#ffffff");
      material.blending = THREE.AdditiveBlending;
    }
    material.needsUpdate = true;
  }

  return {
    setTheme,
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
      io.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
