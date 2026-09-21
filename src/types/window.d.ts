export {};

declare global {
  interface Window {
    downloadAnalysisPdf?: (locale: string, polishedIdea?: string) => void;
  }
}
