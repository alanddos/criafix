import { Router } from "express";

import * as WebhookController from "../controllers/WebhookController";

const webhookRoutes = Router();

webhookRoutes.post("/webhook/:token", WebhookController.index);

export default webhookRoutes;
