import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AIProviderInterface, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class TogetherProvider implements AIProviderInterface {
  private readonly logger = new Logger(TogetherProvider.name);
  private readonly apiKey: string;

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('TOGETHER_API_KEY') || '';
  }

  async generate(
    systemPrompt: string,
    userPrompt: string,
    maxTokens: number = 2000,
  ): Promise<AIResponse> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'Together AI API key not configured',
      };
    }

    try {
      const response = await axios.post(
        'https://api.together.xyz/v1/chat/completions',
        {
          model: 'meta-llama/Llama-3-70b-chat-hf', // Atau model lain yang tersedia di Together
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          max_tokens: maxTokens,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      const text = response.data.choices[0].message.content;
      const tokensUsed = response.data.usage?.total_tokens || 0;

      return {
        success: true,
        content: text,
        tokensUsed,
        model: 'together-llama-3-70b',
      };
    } catch (error) {
      this.logger.error(`Together AI generation failed: ${error.message}`);
      return {
        success: false,
        error:
          error.response?.data?.error?.message ||
          error.message ||
          'Failed to generate with Together AI',
      };
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }
}
