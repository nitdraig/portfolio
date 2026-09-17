/* Orbital nodes — Fibonacci sphere positions, meshes, halos, rings, grid */
/* Runs inline, accesses global THREE */

import type { NodeKey } from "../../data/nodes";

export function createHubPositions(count: number, radius: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    positions.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      )
    );
  }
  return positions;
}

export function createHaloTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(147,197,253,0.9)");
  grad.addColorStop(0.4, "rgba(59,130,246,0.35)");
  grad.addColorStop(1, "rgba(59,130,246,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

export function createHubMeshes(
  group: THREE.Group,
  hubPositions: THREE.Vector3[],
  accent: THREE.Color,
  white: THREE.Color,
  haloMat: THREE.SpriteMaterial
): THREE.Mesh[] {
  const hubGeo = new THREE.SphereGeometry(0.09, 16, 16);
  const hubMat = new THREE.MeshBasicMaterial({ color: accent });
  return hubPositions.map((pos) => {
    const m = new THREE.Mesh(hubGeo, hubMat);
    m.position.copy(pos);
    group.add(m);
    const halo = new THREE.Sprite(haloMat.clone());
    halo.scale.set(0.7, 0.7, 1);
    halo.position.copy(pos);
    group.add(halo);
    m.userData.halo = halo;
    return m;
  });
}

export function createCenterNode(
  group: THREE.Group,
  haloMat: THREE.SpriteMaterial
): THREE.Mesh {
  const centerGeo = new THREE.SphereGeometry(0.06, 16, 16);
  const centerMesh = new THREE.Mesh(centerGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
  group.add(centerMesh);
  const centerHalo = new THREE.Sprite(haloMat.clone());
  centerHalo.material.color = new THREE.Color(0xffffff);
  centerHalo.scale.set(0.55, 0.55, 1);
  group.add(centerHalo);
  return centerMesh;
}

export function createConnections(
  group: THREE.Group,
  hubPositions: THREE.Vector3[],
  hubCount: number,
  lineMat: THREE.LineBasicMaterial
) {
  hubPositions.forEach((pos) => {
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), pos]);
    group.add(new THREE.Line(geo, lineMat));
  });
  for (let i = 0; i < hubCount; i++) {
    const a = hubPositions[i];
    const b = hubPositions[(i + 1) % hubCount];
    const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
    group.add(new THREE.Line(geo, lineMat));
  }
}

export function createOrbitalRings(group: THREE.Group, ringMat: THREE.MeshBasicMaterial) {
  const ringGroup = new THREE.Group();
  [3.9, 4.9, 6.0].forEach((r, i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 8, 80), ringMat);
    ring.rotation.x = i * 0.7;
    ring.rotation.y = i * 0.4;
    ringGroup.add(ring);
  });
  group.add(ringGroup);
  return ringGroup;
}

export function createGrid(scene: THREE.Group, gridMat: THREE.LineBasicMaterial) {
  const gridGroup = new THREE.Group();
  const gridSize = 14;
  const gridDiv = 14;
  for (let i = 0; i <= gridDiv; i++) {
    const p = -gridSize / 2 + (gridSize / gridDiv) * i;
    const g1 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(p, 0, -gridSize / 2),
      new THREE.Vector3(p, 0, gridSize / 2),
    ]);
    gridGroup.add(new THREE.Line(g1, gridMat));
    const g2 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-gridSize / 2, 0, p),
      new THREE.Vector3(gridSize / 2, 0, p),
    ]);
    gridGroup.add(new THREE.Line(g2, gridMat));
  }
  gridGroup.position.y = -3.6;
  scene.add(gridGroup);
  return gridGroup;
}

export function createAmbientParticles(
  group: THREE.Group,
  ambientMat: THREE.PointsMaterial,
  ambLineMat: THREE.LineBasicMaterial
): { positions: THREE.Vector3[]; points: THREE.Points } {
  const AMBIENT = 90;
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < AMBIENT; i++) {
    const r = 2.2 + Math.random() * 2.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
    );
  }
  const geo = new THREE.BufferGeometry();
  geo.setFromPoints(positions);
  const points = new THREE.Points(geo, ambientMat);
  group.add(points);

  for (let i = 0; i < AMBIENT; i++) {
    for (let j = i + 1; j < AMBIENT; j++) {
      if (positions[i].distanceTo(positions[j]) < 1.15 && Math.random() < 0.3) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([positions[i], positions[j]]);
        group.add(new THREE.Line(lineGeo, ambLineMat));
      }
    }
  }

  return { positions, points };
}
