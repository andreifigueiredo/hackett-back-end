// hacket-back-end/src/modules/chat/chat.service.spec.ts
import { ChatService } from './chat.service';
import { LlmService } from '../llm/llm.service';
import { Response } from 'express';

describe('ChatService', () => {
  let chatService: ChatService;
  let llmService: LlmService;

  beforeEach(() => {
    llmService = {
      askStream: jest.fn(),
    } as unknown as LlmService;

    chatService = new ChatService(llmService);
  });

  it('should stream tokens from llmService.askStream to the response', async () => {
    const tokens = ['Hello', ' ', 'world'];
    (llmService.askStream as jest.Mock).mockImplementation(async function* () {
      for (const t of tokens) {
        yield t;
      }
    });

    const res = {
      write: jest.fn(),
      end: jest.fn(),
    } as unknown as Response;

    await chatService.streamMessage('hello', res);

    expect(res.write).toHaveBeenCalledWith(`data: "Hello"\n\n`);
    expect(res.write).toHaveBeenCalledWith(`data: " "\n\n`);
    expect(res.write).toHaveBeenCalledWith(`data: "world"\n\n`);

    expect(res.write).toHaveBeenCalledWith(`data: [DONE]\n\n`);
    expect(res.end).toHaveBeenCalled();
  });

  it('should send [ERROR] if llmService throws', async () => {
    (llmService.askStream as jest.Mock).mockImplementation(async function* () {
      yield "partial token";
      throw new Error("LLM error");
    });

    const res = {
      write: jest.fn(),
      end: jest.fn(),
    } as unknown as Response;

    await chatService.streamMessage('hello', res);

    expect(res.write).toHaveBeenCalledWith(`data: [ERROR]\n\n`);
    expect(res.end).toHaveBeenCalled();
  });
});
