import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { LocalFileEntity } from 'src/entities/local-file.entity';
import LocalFilesInterceptor from 'src/interceptors/local-file.interceptor';
import { ImagesService } from './images.service';
import { Response } from 'express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'image',
      path: '/images',
    }),
  )
  @Post()
  async saveImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ id: string }> {
    return { id: await this.imagesService.saveImage(file) };
  }

  @Get()
  async getAllImages(): Promise<LocalFileEntity[]> {
    return this.imagesService.getAllImages();
  }

  @Get(':id')
  async getImageById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.imagesService.getImageById(id);

    const stream = createReadStream(join(process.cwd(), file.path));

    res.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    });

    return new StreamableFile(stream);
  }

  @Delete(':id')
  async deleteImageById(@Param('id') id: string) {
    return this.imagesService.deleteImageById(id);
  }
}
