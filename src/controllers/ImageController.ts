import { Request, Response } from "express";
import { getIO } from "../libs/socket";
import Image from "../models/Image";
import CreateImageService from "../services/ImageServices/CreateImageService";

import ListMessagesService from "../services/ImageServices/ListImagesService";

type IndexQuery = {
  pageNumber: string;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { imageId } = req.params;
  const { pageNumber } = req.query as IndexQuery;

  const { count, messages, hasMore } = await ListMessagesService({
    pageNumber,
    imageId,
  });

  return res.json({ count, messages, hasMore });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { companyId, token } = req.params;
  console.log(companyId, token);
  const medias = req.files as Express.Multer.File[];

  try {
    if (medias) {
      await Promise.all(
        medias.map(async (media: Express.Multer.File) => {
          const file = await CreateImageService({
            messageData: {
              mediaUrl: media.filename,
              mediaType: media.mimetype.split("/")[0],
              userId: 1,
              companyId,
            },
          });
        })
      );
    }
  } catch (error) {
    console.log(error)
  }

  return res.send("The files was uploaded sucessfully!");
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { messageId } = req.params;

  // TODO
  return res.send();
};
