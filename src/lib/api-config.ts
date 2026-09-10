/**
 * Shared connection details for the event backend.
 *
 * Agenda, speakers and sponsors all read the base URL and token from here, so
 * switching the whole site between the preview and public feeds is a one-line
 * change to ENVIRONMENT instead of a hunt through every client.
 */
export type Environment = "dev" | "staging" | "prod";

export const ENVIRONMENT: Environment = "staging";

const PREVIEW_BASE =
  "https://pap-backend-ebon.vercel.app/api/preview/capital-summit-london";
const PREVIEW_TOKEN = "pappv_6ghZ9NTYLPAKlvyxFgqVsaWJiqTLBZuc";

const PROD_BASE =
  "https://pap-backend-ebon.vercel.app/api/public/capital-summit-london";
const PROD_TOKEN = "pap_wm5x0fDoVzCbg4ACCC2cBlxQULrJybwZ";

const CONFIG: Record<Environment, { base: string; token: string }> = {
  dev: { base: PREVIEW_BASE, token: PREVIEW_TOKEN },
  staging: { base: PREVIEW_BASE, token: PREVIEW_TOKEN },
  prod: { base: PROD_BASE, token: PROD_TOKEN },
};

export const API_BASE = CONFIG[ENVIRONMENT].base;

export const API_TOKEN = CONFIG[ENVIRONMENT].token;

export const apiHeaders = {
  Authorization: `Bearer ${API_TOKEN}`,
};
