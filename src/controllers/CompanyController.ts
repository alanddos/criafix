import { Request, Response } from "express";
import { getIO } from "../libs/socket";
import CreateCompanyService from "../services/CompanyService/CreateCompanyService";
import ListCompanyService from "../services/CompanyService/ListCompanyService";

type IndexQuery = {
  searchParam: string;
  pageNumber: string;
};


export const index = async (req: Request, res: Response): Promise<Response> => {
  const { searchParam, pageNumber } = req.query as IndexQuery;
  const company = await ListCompanyService({ searchParam, pageNumber });

  return res.status(200).json(company);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { name, color, greetingMessage } = req.body;

  const company = await CreateCompanyService({ name, greetingMessage });

  const io = getIO();
  io.emit("company", {
    action: "update",
    company,
  });

  return res.status(200).json(company);
};

// export const show = async (req: Request, res: Response): Promise<Response> => {
//   const { companyId } = req.params;

//   const company = await ShowCompanyService(companyId);

//   return res.status(200).json(company);
// };

// export const update = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const { companyId } = req.params;

//   const company = await UpdateCompanyService(companyId, req.body);

//   const io = getIO();
//   io.emit("company", {
//     action: "update",
//     company,
//   });

//   return res.status(201).json(company);
// };

// export const remove = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const { companyId } = req.params;

//   await DeleteCompanyService(CompanyId);

//   const io = getIO();
//   io.emit("company", {
//     action: "delete",
//     companyId: +companyId,
//   });

//   return res.status(200).send();
// };
