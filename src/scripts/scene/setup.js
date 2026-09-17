/* Scene setup — Three.js with global THREE */
/* Runs inline, accesses global THREE */

export function createScene(canvas) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0b, 0.055);

  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 15);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  return { scene, camera, renderer, resize };
}

export function applyColorScheme(scene, renderer, materials) {
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  scene.fog.color.set(dark ? 0x0a0a0b : 0xf5f5f7);
  renderer.setClearColor(dark ? 0x0a0a0b : 0xf5f5f7, 0);
  if (materials.line) materials.line.color.set(dark ? 0x3a3b3e : 0xc8cace);
  if (materials.ambLine) materials.ambLine.color.set(dark ? 0x3a3b3e : 0xc8cace);
  if (materials.grid) materials.grid.color.set(dark ? 0x2a2b2f : 0xdfe0e4);
  if (materials.ambient) materials.ambient.color.set(dark ? 0x9a9c9f : 0x8e9096);
  if (materials.ring) materials.ring.color.set(dark ? 0x3a3b3e : 0xc8cace);
}
