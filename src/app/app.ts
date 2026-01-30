import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config/swagger.js";
import v1 from "../api/v1/index.js";
import { httpLogger } from "../core/logger/http-logger.js";

const app = express();

// Create the main logger
app.use(httpLogger);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Load API routes
app.use("/api/v1", v1);
export default app;
