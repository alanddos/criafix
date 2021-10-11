import { Router } from "express";

import * as WebhookController from "../controllers/WebhookController";

const webhookRoutes = Router();

webhookRoutes.post("/webhook-updates/:token", WebhookController.updates);
webhookRoutes.post("/webhook-lead/:token", WebhookController.lead);
webhookRoutes.post("/webhook-prospect1/:token", WebhookController.prospect1);
webhookRoutes.post("/webhook-prospect2/:token", WebhookController.prospect2);
webhookRoutes.post("/webhook-prospect3/:token", WebhookController.prospect3);
webhookRoutes.post("/webhook-prospect4/:token", WebhookController.prospect4);

export default webhookRoutes;
