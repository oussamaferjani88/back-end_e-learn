import { Controller, Post, Request } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('app')
export class AppController {
  @Post('admin-auth')
  loginAdmin(@Request() req) {
    const { username, password } = req.body;
    if (username == 'admin' && password == 'adminpass**') return true;
    else return false;
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
