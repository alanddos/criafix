import { Router } from "express";
import multer from "multer";
import isAuth from "../middleware/isAuth";
import uploadConfig from "../config/upload";

import * as ImageController from "../controllers/ImageController";

const imagesRoutes = Router();

const upload = multer(uploadConfig);

imagesRoutes.get("/images", ImageController.index);

imagesRoutes.post(
  "/images",
  upload.array("medias"),
  ImageController.store
);

imagesRoutes.delete("/messages/:id", isAuth, ImageController.remove);

export default imagesRoutes;
