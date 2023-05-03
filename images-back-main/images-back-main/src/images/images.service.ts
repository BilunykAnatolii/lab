import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalFileEntity } from 'src/entities/local-file.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(LocalFileEntity)
    private readonly localFileRepo: Repository<LocalFileEntity>,
  ) {}

  async saveImage(file: Express.Multer.File): Promise<string> {
    const savedImage = await this.localFileRepo.save({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
    });

    return savedImage.local_file_id;
  }

  getAllImages(): Promise<LocalFileEntity[]> {
    return this.localFileRepo.find();
  }

  getImageById(id: string): Promise<LocalFileEntity> {
    return this.localFileRepo.findOneBy({ local_file_id: id });
  }

  async deleteImageById(id: string) {
    const file = await this.localFileRepo.findOneBy({ local_file_id: id });

    if (!file) {
      throw new NotFoundException();
    }

    fs.unlink(file.path, async (err) => {
      if (err) {
        throw new InternalServerErrorException(err);
      }

      await this.localFileRepo.delete({ local_file_id: id });
    });
  }
}
