export {};

type AnalysisPdfWindowPayload = {
  locale: string;
  idea?: string;
  polishedIdea?: string;
  tags?: string[];
  steps?: string[];
  mvp?: string[];
};

declare global {
  interface Window {
    downloadAnalysisPdf?: (payload: AnalysisPdfWindowPayload) => void;
  }
}
