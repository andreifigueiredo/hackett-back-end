import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';

@Injectable()
export class LlmService {
  private readonly apiKey: string | undefined;
  private readonly llmModel: string | undefined;
  private readonly llmDomain: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('llm.apiKey');
    this.llmModel = this.configService.get<string>('llm.model');
    this.llmDomain = this.configService.get<string>('llm.domain');
  }

  async *askStream(message: string): AsyncGenerator<string> {
    const client = new Groq({ apiKey: this.apiKey });

    try {
      const stream = await client.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an expert in ${this.llmDomain}. Only answer questions in this domain.`,
          },
          { role: 'user', content: message },
        ],
        model: this.llmModel!,
        stream: true,
      });

      for await (const chunk of stream) {
        const token = chunk.choices[0]?.delta?.content ?? "";
        if (token) {
          yield token;
        }
      }
    } catch (error) {
      if (error instanceof Groq.APIError) {
        throw new BadRequestException(`⚠️ Groq API Error: ${error.message}`);
      } else {
        throw new BadRequestException('⚠️ Unknown error during streaming.');
      }
    }
  }
}
