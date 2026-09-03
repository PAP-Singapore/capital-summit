/**
 * Shared connection details for the event backend's preview API.
 *
 * The tunnel host is ephemeral, so agenda, speakers and sponsors all read the
 * base URL and token from here — otherwise one of them keeps pointing at a dead
 * host the next time the tunnel is restarted.
 */
export const PREVIEW_API_BASE =
  "https://pap-backend-ebon.vercel.app/api/preview/stable-nyc";

export const PREVIEW_API_TOKEN = "pappv_Xqg0amPpdXO09goIMpmz0WKq4eKjgC71";

export const previewApiHeaders = {
  Authorization: `Bearer ${PREVIEW_API_TOKEN}`,
};
