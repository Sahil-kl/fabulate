/* eslint-disable prettier/prettier */
import { diskStorage } from "multer";
import { extname } from "path";

export const storage = diskStorage({
  destination: './uploads',
});

