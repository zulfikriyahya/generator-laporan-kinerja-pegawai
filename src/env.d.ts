/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GEMINI_API_KEY: string;
  readonly PUBLIC_CLAUDE_API_KEY: string;
  readonly PUBLIC_OPENAI_API_KEY: string;
  readonly PUBLIC_GROQ_API_KEY: string;
  readonly PUBLIC_TOGETHER_API_KEY: string;
  readonly PUBLIC_DEEPSEEK_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
