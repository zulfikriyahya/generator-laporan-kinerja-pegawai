export const API_KEYS = {
  gemini: import.meta.env.PUBLIC_GEMINI_API_KEY || "",
  claude: import.meta.env.PUBLIC_CLAUDE_API_KEY || "",
  gpt: import.meta.env.PUBLIC_OPENAI_API_KEY || "",
  groq: import.meta.env.PUBLIC_GROQ_API_KEY || "",
  together: import.meta.env.PUBLIC_TOGETHER_API_KEY || "",
  deepseek: import.meta.env.PUBLIC_DEEPSEEK_API_KEY || "",
};

export const MODEL_CONFIGS = {
  gemini: {
    model: "gemini-2.0-flash",
    maxTokens: 8000,
    temperature: 0.7,
  },
  claude: {
    model: "claude-3-sonnet-20240229",
    maxTokens: 4000,
    temperature: 0.7,
  },
  gpt: {
    model: "gpt-4o-mini",
    maxTokens: 4000,
    temperature: 0.7,
  },
  groq: {
    model: "llama-3.3-70b-versatile",
    maxTokens: 8000,
    temperature: 0.7,
  },
};
