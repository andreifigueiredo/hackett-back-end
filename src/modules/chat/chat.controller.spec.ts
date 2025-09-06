import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatDto } from './chat.dto';
import { Response } from 'express';

describe('ChatController', () => {
  let chatController: ChatController;
  let chatService: ChatService;

  beforeEach(async () => {
    const mockChatService = {
      streamMessage: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatService,
          useValue: mockChatService,
        },
      ],
    }).compile();

    chatController = module.get<ChatController>(ChatController);
    chatService = module.get<ChatService>(ChatService);
  });

  describe('streamMessage', () => {
    it('should set SSE headers and call ChatService.streamMessage', async () => {
      const body: ChatDto = { message: 'Hello LLM!' };

      const res = {
        setHeader: jest.fn(),
        flushHeaders: jest.fn(),
      } as unknown as Response;

      await chatController.streamMessage(body, res);

      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        'text/event-stream',
      );
      expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-cache');
      expect(res.setHeader).toHaveBeenCalledWith(
        'Connection',
        'keep-alive',
      );
      expect(res.flushHeaders).toHaveBeenCalled();

      expect(chatService.streamMessage).toHaveBeenCalledWith(
        body.message,
        res,
      );
    });
  });
});
