import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { GeminiProvider } from './providers/gemini.provider';
import { ClaudeProvider } from './providers/claude.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { GroqProvider } from './providers/groq.provider';
import { DeepseekProvider } from './providers/deepseek.provider';
import { TogetherProvider } from './providers/together.provider';

@Module({
  imports: [ConfigModule],
  controllers: [AiController],
  providers: [
    AiService,
    GeminiProvider,
    ClaudeProvider,
    OpenAIProvider,
    GroqProvider,
    DeepseekProvider,
    TogetherProvider,
  ],
  exports: [AiService],
})
export class AiModule {}
