import { registerAs } from '@nestjs/config';

export default registerAs('llm', () => ({
  apiKey: process.env.LLM_API_KEY || "insert-you-key",
  model: process.env.LLM_MODEL || 'llama-3.1-8b-instant',
  domain: process.env.LLM_DOMAIN || 'Brazilian cuisine',
}));