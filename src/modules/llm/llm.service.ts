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

  async ask(message: string): Promise<string> {
    const client = new Groq({
        apiKey: this.apiKey,
    });
    // const keywords = ['food', 'cuisine', 'recipe', 'restaurant', 'meal', 'lunch', 'dinner', 'snack', 'eating', 'cook'];

    // const hasFoodKeyword = keywords.some(keyword => message.toLowerCase().includes(keyword));

    // if (!hasFoodKeyword) {
    //   return `⚠️ I only answer questions about ${this.llmDomain}.`;
    // }

    try {
      const chatCompletion = await client.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an expert in ${this.llmDomain}. Only answer questions in this domain.`,
          },
          { role: 'user', content: message },
        ],
        model: this.llmModel!,
      }
      );

      return chatCompletion.choices[0].message.content || "⚠️ It was not possible to answer, please change you question";
    } catch (error) {
      if (error instanceof Groq.APIError) {
        throw new BadRequestException(`⚠️ Groq API Error: ${error.message}`);
      } else {
        throw new BadRequestException('⚠️ An unknown error occurred.');
      }
    }
  }
}
