import { Router } from "express";
import isAuth from "../middleware/isAuth";

import * as CompanyController from "../controllers/CompanyController";

const companyRoutes = Router();

companyRoutes.get("/company", isAuth, CompanyController.index);

companyRoutes.post("/company", isAuth, CompanyController.store);

// companyRoutes.get("/company/:companyId", isAuth, CompanyController.show);

// companyRoutes.put("/company/:companyId", isAuth, CompanyController.update);

// companyRoutes.delete("/company/:companyId", isAuth, CompanyController.remove);

export default companyRoutes;
