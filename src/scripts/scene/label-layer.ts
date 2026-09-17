/* Label layer — HTML overlay for 3D node labels */
/* Runs inline, accesses global THREE */

export function createLabelLayer(
  parent: HTMLElement,
  concepts: string[],
  hubPositions: THREE.Vector3[],
  group: THREE.Group,
  camera: THREE.PerspectiveCamera
): HTMLDivElement[] {
  const labelLayer = document.createElement("div");
  labelLayer.style.cssText = "position:absolute; inset:0; pointer-events:none; z-index:1;";
  parent.appendChild(labelLayer);

  const EDGE_MARGIN = 24;
  const SAFE_ZONE_PADDING = 16;

  const labelEls = concepts.map((text) => {
    const el = document.createElement("div");
    el.textContent = text;
    el.style.cssText =
      "position:absolute; font-family:var(--font-mono); font-size:11px; color:var(--text-dim); letter-spacing:0.04em; transform:translate(-50%,-50%); white-space:nowrap; transition:opacity .3s;";
    labelLayer.appendChild(el);
    return el;
  });

  function isMobile(): boolean {
    return window.innerWidth < 640;
  }

  /**
   * Returns true if (x, y) falls inside the hero content safe zone.
   * The safe zone is the area where headline, status strip, and cmdbar live.
   */
  function isInSafeZone(
    x: number,
    y: number,
    w: number,
    h: number
  ): boolean {
    /* Content sits in the left half, vertically centered.
       On mobile it spans most of the width. */
    const ratio = isMobile() ? 0.88 : 0.52;
    const contentWidth = w * ratio;
    const contentTop = h * 0.28;
    const contentBottom = h * 0.72;

    return x < contentWidth && y > contentTop && y < contentBottom;
  }

  function updateLabels() {
    const rect = parent.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const mobile = isMobile();

    hubPositions.forEach((pos, i) => {
      const v = pos.clone().applyMatrix4(group.matrixWorld).project(camera);
      const x = (v.x * 0.5 + 0.5) * w;
      const y = (-v.y * 0.5 + 0.5) * h;
      const behind = v.z >= 1;

      /* Mobile: hide all floating labels — exploration is via tap+panel */
      if (mobile) {
        labelEls[i].style.opacity = "0";
        return;
      }

      /* Behind camera */
      if (behind) {
        labelEls[i].style.opacity = "0";
        return;
      }

      /* Safe zone: label overlaps the content block */
      if (isInSafeZone(x, y, w, h)) {
        labelEls[i].style.opacity = "0";
        return;
      }

      /* Edge clamp: fade out when touching viewport edges */
      const nearEdge =
        x < EDGE_MARGIN ||
        x > w - EDGE_MARGIN ||
        y < EDGE_MARGIN ||
        y > h - EDGE_MARGIN;

      if (nearEdge) {
        /* Compute distance to nearest edge as 0..1 (0 = on edge, 1 = far) */
        const dx = Math.min(x, w - x);
        const dy = Math.min(y, h - y);
        const dist = Math.min(dx, dy);
        const fade = Math.min(dist / EDGE_MARGIN, 1);
        labelEls[i].style.opacity = String(fade * 0.7);
      } else {
        labelEls[i].style.opacity = "1";
      }

      labelEls[i].style.left = x + "px";
      labelEls[i].style.top = y - 14 + "px";
    });
  }

  return labelEls;
}
