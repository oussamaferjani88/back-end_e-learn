import { Module } from '@nestjs/common';
import { AchatService } from './achat.service';
import { AchatController } from './achat.controller';

@Module({
  controllers: [AchatController],
  providers: [AchatService]
})
export class AchatModule {}
