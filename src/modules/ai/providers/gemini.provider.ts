import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIProviderInterface, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class GeminiProvider implements AIProviderInterface {
  private readonly logger = new Logger(GeminiProvider.name);
  private readonly apiKey: string;
  private readonly genAI: GoogleGenerativeAI;

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('GEMINI_API_KEY') || '';
    if (this.apiKey) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
    }
  }

  async generate(
    systemPrompt: string,
    userPrompt: string,
    maxTokens: number = 2000,
  ): Promise<AIResponse> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'Gemini API key not configured',
      };
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: systemPrompt,
      });

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: maxTokens,
        },
      });

      const response = result.response;
      let text = response.text();

      // Clean markdown artifacts
      text = text
        .replace(/^```markdown\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();

      return {
        success: true,
        content: text,
        tokensUsed: response.usageMetadata?.totalTokenCount || 0,
        model: 'gemini-2.5-flash',
      };
    } catch (error) {
      this.logger.error(`Gemini generation failed: ${error.message}`);
      return {
        success: false,
        error: error.message || 'Failed to generate with Gemini',
      };
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }
}
