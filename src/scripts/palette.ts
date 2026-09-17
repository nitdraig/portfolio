/* Command palette — Cmd+K, list nodes/projects/sections, search, navigate */
/* Runs inline */

import { CONCEPTS, NODE_DATA, type NodeKey } from "../data/nodes";
import { PROJECTS } from "../data/idea";

export type Command = {
  label: string;
  tag: string;
  action?: () => void;
  href?: string;
};

export function buildCommands(
  callbacks: {
    enterInspect: (idx: number) => void;
    enterPortfolio: (hash?: string) => void;
    showProjectDetail: (id: string) => void;
  }
): Command[] {
  return [
    ...CONCEPTS.map((key, i) => ({
      label: key,
      tag: NODE_DATA[key].tag,
      action: () => callbacks.enterInspect(i),
    })),
    ...PROJECTS.map((p) => ({
      label: p.title,
      tag: p.category,
      action: () => {
        callbacks.enterPortfolio("#proof");
        setTimeout(() => callbacks.showProjectDetail(p.id), 950);
      },
    })),
    { label: "Work", tag: "SECTION", href: "#build" },
    { label: "AI", tag: "SECTION", href: "#understand" },
    { label: "Proof", tag: "SECTION", href: "#proof" },
    { label: "About", tag: "SECTION", href: "#connect" },
    { label: "Contact", tag: "SECTION", href: "#connect" },
  ];
}

export function renderCmdk(
  cmdkList: HTMLElement,
  commands: Command[],
  filter: string,
  callbacks: { close: () => void; goTo: (href: string) => void }
) {
  const f = filter.toLowerCase();
  const items = commands.filter((c) => c.label.toLowerCase().includes(f));
  cmdkList.innerHTML =
    items
      .map(
        (c, i) =>
          `<div class="cmdk-item${i === 0 ? " active" : ""}" data-idx="${i}"><span>${c.label}</span><span class="tag">${c.tag}</span></div>`
      )
      .join("") || `<div class="cmdk-item">No results</div>`;

  cmdkList.querySelectorAll(".cmdk-item[data-idx]").forEach((el) => {
    el.addEventListener("click", () => {
      const c = items[Number((el as HTMLElement).dataset.idx)];
      if (!c) return;
      callbacks.close();
      if (c.action) c.action();
      else if (c.href) callbacks.goTo(c.href);
    });
  });
}

export function openCmdk(
  cmdkOverlay: HTMLElement,
  cmdkInput: HTMLInputElement,
  cmdkList: HTMLElement,
  commands: Command[],
  callbacks: { close: () => void; goTo: (href: string) => void }
) {
  cmdkOverlay.classList.add("show");
  cmdkInput.value = "";
  renderCmdk(cmdkList, commands, "", callbacks);
  cmdkInput.focus();
}

export function closeCmdk(cmdkOverlay: HTMLElement) {
  cmdkOverlay.classList.remove("show");
}
