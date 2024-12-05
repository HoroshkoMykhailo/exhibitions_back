import { BadRequestException } from "@nestjs/common";

export const imageFileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void => {
    if (!file.mimetype.startsWith('image/')) {
      return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
  };