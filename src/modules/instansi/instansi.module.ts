import { Module } from '@nestjs/common';
import { InstansiService } from './instansi.service';
import { InstansiController } from './instansi.controller';

@Module({
  controllers: [InstansiController],
  providers: [InstansiService],
  exports: [InstansiService],
})
export class InstansiModule {}
