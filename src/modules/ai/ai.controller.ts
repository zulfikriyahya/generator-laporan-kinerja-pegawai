import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { GenerateReportDto } from './dto/generate-report.dto';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('ai')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate report using AI' })
  @ApiResponse({ status: 200, description: 'Report generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async generateReport(@Body() dto: GenerateReportDto) {
    return this.aiService.generateReport(dto);
  }

  @Get('models')
  @ApiOperation({ summary: 'Get available AI models' })
  getAvailableModels() {
    return {
      models: this.aiService.getAvailableModels(),
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Check AI service health' })
  healthCheck() {
    return {
      status: 'ok',
      availableModels: this.aiService.getAvailableModels(),
    };
  }
}
