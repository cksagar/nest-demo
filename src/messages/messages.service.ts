import { Injectable } from '@nestjs/common';
import { MessageRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private messageRepository: MessageRepository) {}

  findOne(id: string) {
    return this.messageRepository.findOne(id);
  }

  findAll() {
    return this.messageRepository.findAll();
  }

  createMessage(content: string) {
    return this.messageRepository.createMessage(content);
  }
}
