import type { APIRoute } from "astro";
import { createFormToken } from "../../lib/contact/formToken";
import { isSameOriginRequest } from "../../lib/contact/origin";

export const GET: APIRoute = async ({ request }) => {
  if (!isSameOriginRequest(request)) {
    return Response.json({ token: "" }, { status: 403 });
  }

  const token = await createFormToken();
  return Response.json({ token });
};
