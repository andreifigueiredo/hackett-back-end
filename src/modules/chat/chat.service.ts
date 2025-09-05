import { Injectable } from '@nestjs/common';
import { LlmService } from '../llm/llm.service';


@Injectable()
export class ChatService {
  constructor(private readonly llmService: LlmService) {}

  async sendMessage(message: string): Promise<{ reply: string }> {
    const reply = await this.llmService.ask(message);
    return { reply };
  }
}
