import express from "express";
import morgan from "morgan";
import pino from "pino";
import { pinoHttp } from "pino-http";
import router from "./routes/ping.routes.js";

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

// Load routes from router
app.use(router);
export default app;
