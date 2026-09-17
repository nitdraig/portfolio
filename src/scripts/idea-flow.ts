/* Idea flow — modal, loading, sessionStorage, redirect */
/* Runs inline */

export function openCmdbarModal(
  cmdModal: HTMLElement,
  cmdModalInput: HTMLTextAreaElement,
  cmdInput: HTMLTextAreaElement
) {
  if (cmdModal.classList.contains("show")) return;
  cmdModal.classList.add("show");
  cmdModal.setAttribute("aria-hidden", "false");
  cmdModalInput.value = cmdInput.value;
  document.documentElement.classList.add("locked");
  requestAnimationFrame(() => cmdModalInput.focus());
}

export function closeCmdbarModal(
  cmdModal: HTMLElement,
  cmdModalInput: HTMLTextAreaElement,
  cmdInput: HTMLTextAreaElement,
  isAnalyzing: boolean,
  cancelAnalysis: () => void
) {
  if (isAnalyzing) cancelAnalysis();
  cmdModal.classList.remove("show");
  cmdModal.setAttribute("aria-hidden", "true");
  cmdInput.value = cmdModalInput.value;
  document.documentElement.classList.remove("locked");
}

export function submitIdea(
  text: string,
  callbacks: {
    decomposeIdea: (text: string) => string[];
    matchProjects: (text: string, tags: string[]) => any[];
    generateMvp: (text: string, tags: string[]) => string[];
    generateNextSteps: (text: string, tags: string[]) => string[];
    onThinking: () => void;
    onDone: (data: any) => void;
  }
) {
  const tags = callbacks.decomposeIdea(text);
  const projects = callbacks.matchProjects(text, tags);
  const mvp = callbacks.generateMvp(text, tags);
  const steps = callbacks.generateNextSteps(text, tags);

  callbacks.onThinking();

  setTimeout(() => {
    const data = {
      idea: text,
      tags,
      projects: projects.map((p: any) => ({ id: p.id, title: p.title, category: p.category, type: p.type })),
      mvp,
      steps,
    };
    sessionStorage.setItem("agustinIdeaAnalysis", JSON.stringify(data));
    callbacks.onDone(data);
  }, 1500);
}

export function redirectToAnalysis(locale: string) {
  const veil = document.getElementById("transition-veil");
  if (veil) veil.classList.add("show");
  setTimeout(() => {
    window.location.href = `/${locale}/analysis`;
  }, 500);
}
