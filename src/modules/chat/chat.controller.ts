import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  sendMessage(@Body() body: ChatDto) {
    return this.chatService.sendMessage(body.message);
  }
}
