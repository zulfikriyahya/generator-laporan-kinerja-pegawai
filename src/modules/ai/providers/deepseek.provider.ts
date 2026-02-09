import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AIProviderInterface, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class DeepseekProvider implements AIProviderInterface {
  private readonly logger = new Logger(DeepseekProvider.name);
  private readonly apiKey: string;
  private readonly apiUrl = 'https://api.deepseek.com/chat/completions';

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('DEEPSEEK_API_KEY') || '';
  }

  async generate(
    systemPrompt: string,
    userPrompt: string,
    maxTokens: number = 2000,
  ): Promise<AIResponse> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'DeepSeek API key not configured',
      };
    }

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'deepseek-chat',
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
      const tokensUsed = response.data.usage.total_tokens;

      return {
        success: true,
        content: text,
        tokensUsed,
        model: 'deepseek-chat',
      };
    } catch (error) {
      this.logger.error(`DeepSeek generation failed: ${error.message}`);
      return {
        success: false,
        error:
          error.response?.data?.error?.message ||
          error.message ||
          'Failed to generate with DeepSeek',
      };
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }
}
