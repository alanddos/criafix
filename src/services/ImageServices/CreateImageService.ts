import Image from "../../models/Image";

interface MessageData {
  mediaType?: string;
  mediaUrl?: string;
  isDeleted?: boolean;
  userId?: string | number;
  companyId?: string | number;
}
interface Request {
  messageData: MessageData;
}

const CreateImageService = async ({ messageData }: Request): Promise<Image> => {
  const image = await Image.create(messageData, { logging: console.log });
  return image;
};

export default CreateImageService;
