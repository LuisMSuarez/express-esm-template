import { pinoHttp } from "pino-http";
import { logger } from "./index.js";

export const httpLogger = pinoHttp({
  logger,
  customSuccessMessage: () => "request completed",
  customErrorMessage: () => "request failed",
});
