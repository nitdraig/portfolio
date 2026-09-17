import { ui, type Locale } from "./ui";

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (lang === "en" || lang === "es") return lang;
  return "es";
}

export function useTranslations(lang: Locale) {
  return ui[lang];
}

export function getLocalizedPath(lang: Locale, path: string = "") {
  const clean = path.replace(/^\//, "");
  return `/${lang}/${clean}`.replace(/\/$/, "") || `/${lang}`;
}

/** Swap locale keeping rest of path after /es or /en */
export function switchLocalePath(url: URL, next: Locale): string {
  const parts = url.pathname.split("/");
  if (parts[1] === "es" || parts[1] === "en") {
    parts[1] = next;
  } else {
    parts.splice(1, 0, next);
  }
  const path = parts.join("/") || `/${next}`;
  return path + url.search + url.hash;
}
