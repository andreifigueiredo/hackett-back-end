import { IsNotEmpty, IsString } from 'class-validator';

export class ChatDto {
  @IsString()
  @IsNotEmpty({ message: 'message should not be empty' })
  message: string;
}

export class MessageEventDto {
  data: string
}
