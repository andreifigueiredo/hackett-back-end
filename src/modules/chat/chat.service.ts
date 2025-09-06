import { Injectable } from '@nestjs/common';
import { LlmService } from '../llm/llm.service';
import { type Response } from 'express';

@Injectable()
export class ChatService {
  constructor(private readonly llmService: LlmService) { }

  async streamMessage(message: string, res: Response): Promise<void> {
    try {
      for await (const token of this.llmService.askStream(message)) {
        res.write(`data: ${JSON.stringify(token)}\n\n`);
      }
      res.write(`data: [DONE]\n\n`);
    } catch (error) {
      console.error(error);
      res.write(`data: [ERROR]\n\n`);
    } finally {
      res.end();
    }
  }
}
