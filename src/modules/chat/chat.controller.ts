import { Body, Controller, Post, Res, ValidationPipe, UsePipes } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './chat.dto';
import { type Response } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async streamMessage(@Body() body: ChatDto, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    return this.chatService.streamMessage(body.message, res);
  }
}
