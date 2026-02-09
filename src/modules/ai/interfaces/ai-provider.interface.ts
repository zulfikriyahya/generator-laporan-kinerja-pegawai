export interface AIProviderInterface {
  generate(systemPrompt: string, userPrompt: string, maxTokens?: number): Promise<AIResponse>;
  isAvailable(): boolean;
}

export interface AIResponse {
  success: boolean;
  content?: string;
  tokensUsed?: number;
  error?: string;
  model?: string;
}
