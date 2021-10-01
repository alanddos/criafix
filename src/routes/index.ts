import { Router } from "express";

import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import imageRoutes from "./imageRoutes";
import contactRoutes from "./contactRoutes";
import companyRoutes from "./companyRoutes";
import webhookRoutes from "./webhookRoutes";

const routes = Router();

routes.use(userRoutes);
routes.use("/auth", authRoutes);
routes.use(contactRoutes);
routes.use(imageRoutes);
routes.use(companyRoutes);
routes.use(webhookRoutes);

export default routes;
