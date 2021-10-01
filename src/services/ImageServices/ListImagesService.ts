// import AppError from "../../errors/AppError";
import Image from "../../models/Image";

interface Request {
  imageId: string;
  pageNumber?: string;
}

interface Response {
  messages: Image[];
  count: number;
  hasMore: boolean;
}

const ListMessagesService = async ({
  pageNumber = "1",
  imageId
}: Request): Promise<Response> => {
  const limit = 20;
  const offset = limit * (+pageNumber - 1);

  const { count, rows: images } = await Image.findAndCountAll({
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  const hasMore = count > offset + images.length;

  return {
    messages: images.reverse(),
    count,
    hasMore,
  };
};

export default ListMessagesService;
