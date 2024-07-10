import { Configuration } from "openai";

export function configureOpenAi() {
  const config = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
    organization: process.env.OPEN_AI_ORGANIZATION_ID,
  });
  return config;
}
