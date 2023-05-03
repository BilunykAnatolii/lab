import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalFileEntity } from 'src/entities/local-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFileEntity])],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
