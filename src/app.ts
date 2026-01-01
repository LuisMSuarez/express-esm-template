import express from "express";
import morgan from "morgan";
import { container } from "./container.js";
import { TYPES } from "./types.js";
import { PingController } from "./controllers/ping.controller.js";

const app = express();

// Add Morgan as middleware
app.use(morgan("combined"));

const pingController = container.get<PingController>(TYPES.PingController);

app.get("/ping", (req, res) => pingController.handlePing(req, res));

export default app;
