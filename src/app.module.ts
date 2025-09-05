import { Module } from '@nestjs/common';
import { ChatModule } from './modules/chat/chat.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import llmConfig from './config/llm.config';
import appConfig from './config/app.config';

@Module({
  imports: [
    ChatModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 5,
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [llmConfig, appConfig],
    }),
  ],
  providers: [
    
  ],
})
export class AppModule {}
