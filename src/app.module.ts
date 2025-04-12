import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [CatsModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
