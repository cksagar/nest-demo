import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import { extname, join } from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('pdf')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'), // ✅ Use project root
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    const pdfPath = join(process.cwd(), 'uploads', file.filename); // ✅ Absolute path from root
    const htmlPath = await this.uploadService.convertPdfToHtml(
      pdfPath,
      file.filename,
    );
    return {
      htmlPath: `/converted/${file.filename.replace(/\.pdf$/, '.html')}`,
    };
  }
}
