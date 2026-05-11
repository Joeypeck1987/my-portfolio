(() => {
  const canvas = document.querySelector('#poster-particles');
  const poster = document.querySelector('.poster');

  if (!canvas || !poster || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const particleCount = 1100;
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  const phases = new Float32Array(particleCount);
  const sizes = new Float32Array(particleCount);

  function resetParticle(i, randomY = true) {
    const i3 = i * 3;

    positions[i3] = (Math.random() - 0.5) * 13.6;
    positions[i3 + 1] = randomY ? (Math.random() - 0.5) * 10.5 : -5.2;
    positions[i3 + 2] = (Math.random() - 0.5) * 3.0;

    velocities[i3] = (Math.random() - 0.5) * 0.0026;
    velocities[i3 + 1] = (Math.random() - 0.42) * 0.0021;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.0015;

    phases[i] = Math.random() * Math.PI * 2;
    sizes[i] = 0.012 + Math.random() * 0.018;
  }

  for (let i = 0; i < particleCount; i++) {
    resetParticle(i);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xd6b15e,
    size: 0.04,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  poster.addEventListener('pointermove', (event) => {
    const rect = poster.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.28;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.22;
  });

  poster.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function resize() {
    const rect = poster.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resize);
  resize();

  function animate(time) {
    const t = time * 0.001;
    const array = geometry.attributes.position.array;

    currentX += (targetX - currentX) * 0.025;
    currentY += (targetY - currentY) * 0.025;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const phase = phases[i];
      const slowCurl = Math.sin(t * 0.36 + phase) * 0.0011;
      const lift = Math.cos(t * 0.29 + phase * 0.7) * 0.0008;

      array[i3] += velocities[i3] + slowCurl;
      array[i3 + 1] += velocities[i3 + 1] + lift;
      array[i3 + 2] += velocities[i3 + 2] + Math.sin(t * 0.18 + phase) * 0.00035;

      if (array[i3] > 6.8 || array[i3] < -6.8 || array[i3 + 1] > 5.25 || array[i3 + 1] < -5.25) {
        resetParticle(i, false);
      }
    }

    geometry.attributes.position.needsUpdate = true;

    particles.rotation.y = currentX * 0.12;
    particles.rotation.x = currentY * 0.08;
    particles.rotation.z = Math.sin(t * 0.05) * 0.006;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
