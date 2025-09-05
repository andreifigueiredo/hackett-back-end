import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LlmModule } from '../llm/llm.module';

@Module({
  imports: [ LlmModule ],
  controllers: [ChatController],
  providers: [
    ChatService,
  {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
  }],
})
export class ChatModule {}
