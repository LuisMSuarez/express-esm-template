import express from "express";
import { container } from "./container.js";
import { TYPES } from "./types.js";
import { PingController } from "./controllers/ping.controller.js";

const app = express();

const pingController = container.get<PingController>(TYPES.PingController);

app.get("/ping", (req, res) => pingController.handlePing(req, res));

export default app;
