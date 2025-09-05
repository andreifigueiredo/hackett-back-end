import { Module } from '@nestjs/common';
import { LlmService } from '../llm/llm.service';

@Module({
  exports: [LlmService ],
  providers: [ LlmService ]
})
export class LlmModule {}
