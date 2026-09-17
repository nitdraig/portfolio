function requestHosts(request: Request): string[] {
  return [
    request.headers.get("x-forwarded-host"),
    request.headers.get("host"),
    new URL(request.url).host,
  ]
    .filter((host): host is string => Boolean(host))
    .map((host) => host.split(",")[0].trim());
}

function hostMatchesRequest(urlLike: string, request: Request): boolean {
  try {
    const host = new URL(urlLike).host;
    return requestHosts(request).includes(host);
  } catch {
    return false;
  }
}

/**
 * Allow browser same-origin fetch. GET often omits Origin; use Sec-Fetch-Site
 * and Referer as fallbacks. Cross-site POSTs from bots still fail.
 */
export function isSameOriginRequest(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "same-origin" || fetchSite === "same-site") {
    return true;
  }

  const origin = request.headers.get("origin");
  if (origin && hostMatchesRequest(origin, request)) {
    return true;
  }

  const referer = request.headers.get("referer");
  if (referer && hostMatchesRequest(referer, request)) {
    return true;
  }

  return false;
}
