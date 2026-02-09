import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AIProviderInterface, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class OpenAIProvider implements AIProviderInterface {
  private readonly logger = new Logger(OpenAIProvider.name);
  private readonly apiKey: string;

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('OPENAI_API_KEY') || '';
  }

  async generate(
    systemPrompt: string,
    userPrompt: string,
    maxTokens: number = 2000,
  ): Promise<AIResponse> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'OpenAI API key not configured',
      };
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          max_tokens: maxTokens,
          temperature: 0.7,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      const text = response.data.choices[0].message.content;
      const tokensUsed = response.data.usage.total_tokens;

      return {
        success: true,
        content: text,
        tokensUsed,
        model: 'gpt-4o-mini',
      };
    } catch (error) {
      this.logger.error(`OpenAI generation failed: ${error.message}`);
      return {
        success: false,
        error:
          error.response?.data?.error?.message || error.message || 'Failed to generate with OpenAI',
      };
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }
}
