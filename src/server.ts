/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import gracefulShutdown from "http-graceful-shutdown";
import fs from "fs"
import app from "./app";
import { initIO } from "./libs/socket";
import { logger } from "./utils/logger";
import { UpsertLeadsOnCv } from "./egoiServices/upsertLeadsOnCv";

const server = app.listen(process.env.PORT, () => {
  logger.info(`Server started on port: ${process.env.PORT}`);
});

initIO(server);

UpsertLeadsOnCv()



