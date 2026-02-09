import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AIProviderInterface, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class ClaudeProvider implements AIProviderInterface {
  private readonly logger = new Logger(ClaudeProvider.name);
  private readonly apiKey: string;

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('CLAUDE_API_KEY') || '';
  }

  async generate(
    systemPrompt: string,
    userPrompt: string,
    maxTokens: number = 2000,
  ): Promise<AIResponse> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'Claude API key not configured',
      };
    }

    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-sonnet-4-20250514',
          max_tokens: maxTokens,
          temperature: 0.7,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: userPrompt,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01',
          },
        },
      );

      const text = response.data.content[0].text;
      const tokensUsed = response.data.usage.input_tokens + response.data.usage.output_tokens;

      return {
        success: true,
        content: text,
        tokensUsed,
        model: 'claude-sonnet-4-20250514',
      };
    } catch (error) {
      this.logger.error(`Claude generation failed: ${error.message}`);
      return {
        success: false,
        error:
          error.response?.data?.error?.message || error.message || 'Failed to generate with Claude',
      };
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }
}
