import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";

const mount = document.querySelector(".three-stage");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (mount) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080706, 0.038);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 120);
  camera.position.set(0, 1.6, 8.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);

  const gold = new THREE.Color(0xf0dca2);
  const oldGold = new THREE.Color(0xd6b15e);
  const deepBrown = new THREE.Color(0x2a2118);
  const blackWood = new THREE.Color(0x090807);

  const ambient = new THREE.AmbientLight(0xd6b15e, 0.45);
  scene.add(ambient);

  const moonLight = new THREE.PointLight(0xf0dca2, 4.25, 34);
  moonLight.position.set(-4.8, 4.8, -2.2);
  scene.add(moonLight);

  const candleLight = new THREE.PointLight(0xd6b15e, 2.4, 16);
  candleLight.position.set(3.5, -1.3, 3.3);
  scene.add(candleLight);

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 64, 64),
    new THREE.MeshStandardMaterial({
      color: 0xf0dca2,
      emissive: 0x8c713c,
      emissiveIntensity: 0.34,
      roughness: 0.82,
      metalness: 0.02
    })
  );
  moon.position.set(-4.6, 3.2, -4.2);
  scene.add(moon);

  const moonHalo = new THREE.Mesh(
    new THREE.SphereGeometry(1.65, 64, 64),
    new THREE.MeshBasicMaterial({
      color: 0xd6b15e,
      transparent: true,
      opacity: 0.075,
      depthWrite: false
    })
  );
  moonHalo.position.copy(moon.position);
  scene.add(moonHalo);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30, 24, 24),
    new THREE.MeshStandardMaterial({
      color: 0x0d0d0d,
      roughness: 0.92,
      metalness: 0.05,
      transparent: true,
      opacity: 0.78
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2.45;
  scene.add(floor);

  const grid = new THREE.GridHelper(30, 30, 0x6d5735, 0x3b3327);
  grid.position.y = -2.43;
  grid.material.transparent = true;
  grid.material.opacity = 0.24;
  scene.add(grid);

  function makePanel(title, subtitle, x, y, z, rotationY = 0) {
    const group = new THREE.Group();
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(2.35, 1.35, 0.08),
      new THREE.MeshStandardMaterial({
        color: deepBrown,
        roughness: 0.7,
        metalness: 0.18,
        emissive: 0x1c140d,
        emissiveIntensity: 0.28
      })
    );

    const inner = new THREE.Mesh(
      new THREE.PlaneGeometry(2.12, 1.12),
      new THREE.MeshBasicMaterial({ color: blackWood, transparent: true, opacity: 0.72 })
    );
    inner.position.z = 0.052;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "rgba(240,220,162,0.18)");
    gradient.addColorStop(0.35, "rgba(10,9,8,0.90)");
    gradient.addColorStop(1, "rgba(109,87,53,0.32)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(240,220,162,0.68)";
    ctx.lineWidth = 10;
    ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);
    ctx.fillStyle = "#f0dca2";
    ctx.font = "700 72px Georgia";
    ctx.textAlign = "center";
    ctx.fillText(title, canvas.width / 2, 220);
    ctx.fillStyle = "#bca66b";
    ctx.font = "italic 38px Georgia";
    ctx.fillText(subtitle, canvas.width / 2, 292);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const textPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(2.12, 1.12),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true })
    );
    textPlane.position.z = 0.061;

    group.add(frame, inner, textPlane);
    group.position.set(x, y, z);
    group.rotation.y = rotationY;
    group.userData.homeY = y;
    return group;
  }

  const panels = [
    makePanel("Eidolon Sleep", "portfolio / archive / craft", -2.8, 0.85, -0.8, 0.24),
    makePanel("The Kept Room", "lyrics / music / fragments", 2.8, 0.2, -1.4, -0.28),
    makePanel("Signs", "light · growth · echoes", -3.9, -1.0, 1.2, 0.42),
    makePanel("Relics", "old web fingerprints", 3.9, -1.18, 0.9, -0.46)
  ];
  panels.forEach((panel) => scene.add(panel));

  const arch = new THREE.Group();
  const pillarMaterial = new THREE.MeshStandardMaterial({ color: 0x15120f, roughness: 0.76, metalness: 0.12 });
  const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(0.34, 3.2, 0.34), pillarMaterial);
  const rightPillar = leftPillar.clone();
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.34, 0.34), pillarMaterial);
  leftPillar.position.set(-1.2, -0.6, -2.6);
  rightPillar.position.set(1.2, -0.6, -2.6);
  lintel.position.set(0, 1.15, -2.6);
  arch.add(leftPillar, rightPillar, lintel);
  scene.add(arch);

  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 900;
  const positions = new Float32Array(particleCount * 3);
  const speeds = [];

  for (let i = 0; i < particleCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    speeds.push(0.002 + Math.random() * 0.006);
  }

  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      color: oldGold,
      size: 0.026,
      transparent: true,
      opacity: 0.62,
      depthWrite: false
    })
  );
  scene.add(particles);

  const glyphs = [];
  function makeGlyph(symbol, x, y, z) {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(240,220,162,0.86)";
    ctx.font = "132px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(symbol, 128, 132);

    const texture = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.48 }));
    sprite.position.set(x, y, z);
    sprite.scale.set(0.88, 0.88, 0.88);
    sprite.userData.homeY = y;
    glyphs.push(sprite);
    scene.add(sprite);
  }

  makeGlyph("☾", -5.3, 1.0, 1.5);
  makeGlyph("✿", 4.9, 1.6, -0.6);
  makeGlyph("⚰", 0.4, -1.1, 2.0);

  let targetX = 0;
  let targetY = 0;
  window.addEventListener("pointermove", (event) => {
    targetX = (event.clientX / window.innerWidth - 0.5) * 0.8;
    targetY = (event.clientY / window.innerHeight - 0.5) * 0.5;
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();

  function animate() {
    const elapsed = clock.getElapsedTime();

    moon.rotation.y = elapsed * 0.06;
    moonHalo.scale.setScalar(1 + Math.sin(elapsed * 0.7) * 0.035);
    candleLight.intensity = 2.1 + Math.sin(elapsed * 5.5) * 0.18;

    panels.forEach((panel, index) => {
      panel.position.y = panel.userData.homeY + Math.sin(elapsed * 0.65 + index) * 0.08;
      panel.rotation.z = Math.sin(elapsed * 0.32 + index) * 0.015;
    });

    glyphs.forEach((glyph, index) => {
      glyph.position.y = glyph.userData.homeY + Math.sin(elapsed * 0.8 + index * 1.7) * 0.18;
      glyph.material.opacity = 0.34 + Math.sin(elapsed * 0.9 + index) * 0.12;
    });

    const pos = particles.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i += 1) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 4.5) pos[i * 3 + 1] = -4.5;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y = elapsed * 0.018;

    camera.position.x += (targetX - camera.position.x) * 0.025;
    camera.position.y += (1.6 - targetY - camera.position.y) * 0.025;
    camera.lookAt(0, 0, -1.4);

    renderer.render(scene, camera);
    if (!prefersReducedMotion) requestAnimationFrame(animate);
  }

  animate();
}
