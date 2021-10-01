import { Request, Response } from "express";

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { token } = req.params;

  console.log(token)
  const userData = req.body;
  console.log(userData);
  return res.status(200).json({ message: "Message Received!" });
};
