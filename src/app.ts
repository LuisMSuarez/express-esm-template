import express from "express";
import morgan from "morgan";
import pino from "pino";
import { container } from "./container.js";
import { TYPES } from "./types.js";
import { PingController } from "./controllers/ping.controller.js";
import { pinoHttp } from "pino-http";

const app = express();

// Add Morgan as request/access middleware
app.use(morgan("combined"));

// Create the main logger
const logger = pino({
  level: "info",
  transport: { target: "pino-pretty", options: { colorize: true } },
});

// Attach Pino to each request
app.use(pinoHttp());

const pingController = container.get<PingController>(TYPES.PingController);

app.get("/ping", (req, res) => pingController.handlePing(req, res));

export default app;
