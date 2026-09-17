/* Interaction — drag orbit, WASD, wheel zoom, raycasting */
/* Runs inline, accesses global THREE */

export function setupDragOrbit(
  canvas: HTMLCanvasElement,
  state: {
    dragRotX: number;
    dragRotY: number;
    isDragging: boolean;
    dragMoved: number;
    mode: string;
    heroMode: string;
  }
) {
  let dragStartX = 0;
  let dragStartY = 0;
  let dragStartRotX = 0;
  let dragStartRotY = 0;

  canvas.addEventListener("pointerdown", (e: PointerEvent) => {
    if (state.heroMode !== "explore" || state.mode !== "explore") return;
    state.isDragging = true;
    state.dragMoved = 0;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragStartRotX = state.dragRotX;
    dragStartRotY = state.dragRotY;
  });

  window.addEventListener("pointermove", (e: PointerEvent) => {
    if (!state.isDragging) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    state.dragMoved = Math.max(state.dragMoved, Math.abs(dx) + Math.abs(dy));
    state.dragRotY = dragStartRotY + dx * 0.006;
    state.dragRotX = Math.max(-0.9, Math.min(0.9, dragStartRotX + dy * 0.004));
  });

  window.addEventListener("pointerup", () => {
    state.isDragging = false;
  });
}

export function setupKeyboard(
  state: {
    keysDown: Record<string, boolean>;
    mode: string;
    heroMode: string;
    selectedNodeIndex: number;
    hubCount: number;
  },
  callbacks: {
    enterInspect: (idx: number) => void;
    exitInspect: () => void;
  }
) {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (state.heroMode === "explore" && state.mode === "explore" && !e.repeat) {
      state.keysDown[e.key.toLowerCase()] = true;
    }
    if (e.key === "Escape") {
      if (state.mode !== "explore") {
        e.preventDefault();
        callbacks.exitInspect();
      }
    }
    if (state.heroMode === "explore" && state.mode === "inspect" && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
      e.preventDefault();
      const dir = e.key === "ArrowLeft" ? -1 : 1;
      callbacks.enterInspect((state.selectedNodeIndex + dir + state.hubCount) % state.hubCount);
    }
  });

  window.addEventListener("keyup", (e: KeyboardEvent) => {
    state.keysDown[e.key.toLowerCase()] = false;
  });
}

export function setupWheelZoom(
  state: {
    zoomZ: number;
    zoomLocked: boolean;
    heroMode: string;
    mode: string;
  },
  callbacks: {
    enterPortfolio: () => void;
    exitInspect: () => void;
    nodePanelContains: (el: Element) => boolean;
  }
) {
  window.addEventListener(
    "wheel",
    (e: WheelEvent) => {
      if (state.heroMode !== "explore") return;
      if (state.mode === "inspect") {
        if (callbacks.nodePanelContains(e.target as Element)) return;
        e.preventDefault();
        if (e.deltaY > 0) callbacks.exitInspect();
        return;
      }
      e.preventDefault();
      state.zoomZ = Math.max(5.5, Math.min(24, state.zoomZ + e.deltaY * 0.012));
      if (state.zoomZ > 21.5 && !state.zoomLocked) {
        state.zoomLocked = true;
        callbacks.enterPortfolio();
      }
    },
    { passive: false }
  );
}

export function setupRaycast(
  camera: THREE.PerspectiveCamera,
  hubMeshes: THREE.Mesh[],
  hubPositions: THREE.Vector3[],
  group: THREE.Group,
  state: {
    mode: string;
    heroMode: string;
    focusedIndex: number;
    isDragging: boolean;
  },
  callbacks: {
    enterInspect: (idx: number) => void;
    exitInspect: () => void;
    onHover: (idx: number) => void;
    onHoverEnd: () => void;
  }
) {
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();

  window.addEventListener("mousemove", (e: MouseEvent) => {
    ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
    ndc.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects(hubMeshes);
    if (hits.length && state.mode === "explore" && !state.isDragging) {
      const idx = hubMeshes.indexOf(hits[0].object as THREE.Mesh);
      if (state.focusedIndex !== idx) callbacks.onHover(idx);
    } else {
      callbacks.onHoverEnd();
    }
  });

  return {
    handleClick(e: MouseEvent) {
      ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
      ndc.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(hubMeshes);
      if (hits.length) {
        const idx = hubMeshes.indexOf(hits[0].object as THREE.Mesh);
        callbacks.enterInspect(idx);
      } else if (state.mode !== "explore") {
        callbacks.exitInspect();
      }
    },
  };
}
