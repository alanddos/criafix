import { Request, Response } from "express";
const { FindContact } = require("../egoiServices/FindContact");

export const updates = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("*****************************updates******************");
  const { token } = req.params;
  const userData = req.body;
  return res.status(200).json({ message: "Message Received!" });
};
export const lead = async (req: Request, res: Response): Promise<Response> => {
  console.log("*****************************lead******************");
  const { token } = req.params;
  const userData = req.body;
  console.log(userData);
  if (userData.situacao.id === 1) {
    const contacts: any = await FindContact(userData.email);
    contacts.map(async (c: any) => {
      console.log("Eai");
      console.log(c);
    });
  }
  return res.status(200).json({ message: "Message Received!" });
};
export const prospect1 = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { token } = req.params;
  const userData = req.body;
  console.log(userData);
  if (userData.situacao.id === 1) {
    const contacts: any = await FindContact(userData.email);
    contacts.map(async (c: any) => {
      console.log("Eai");
      console.log(c);
    });
  }
  return res.status(200).json({ message: "Message Received!" });
};
export const prospect2 = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("*****************************prospect2******************");
  const { token } = req.params;
  const userData = req.body;
  console.log(userData);
  if (userData.situacao.id === 1) {
    const contacts: any = await FindContact(userData.email);
    contacts.map(async (c: any) => {
      console.log("Eai");
      console.log(c);
    });
  }
  return res.status(200).json({ message: "Message Received!" });
};
export const prospect3 = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("*****************************prospect3******************");
  const { token } = req.params;
  const userData = req.body;
  console.log(userData);
  if (userData.situacao.id === 1) {
    const contacts: any = await FindContact(userData.email);
    contacts.map(async (c: any) => {
      console.log("Eai");
      console.log(c);
    });
  }
  return res.status(200).json({ message: "Message Received!" });
};
export const prospect4 = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log("*****************************prospect4******************");
  const { token } = req.params;
  const userData = req.body;
  console.log(userData);
  if (userData.situacao.id === 1) {
    const contacts: any = await FindContact(userData.email);
    contacts.map(async (c: any) => {
      console.log("Eai");
      console.log(c);
    });
  }
  return res.status(200).json({ message: "Message Received!" });
};
