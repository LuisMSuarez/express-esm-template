import express from "express";
import morgan from "morgan";
import pino from "pino";
import { pinoHttp } from "pino-http";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config/swagger.js";
import v1 from "../api/v1/index.js";

const app = express();

// Add Morgan as request/access middleware
app.use(morgan("combined"));

// Create the main logger
const logger = pino({
  level: "info",
  transport: { target: "pino-pretty", options: { colorize: true } },
});

// Attach Pino to each request
app.use(pinoHttp({ logger }));

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Load API routes
app.use("/api/v1", v1);
export default app;
