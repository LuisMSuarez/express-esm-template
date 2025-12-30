import express from "express";

const app = express();

app.get("/ping", (_req, res) => {
  res.json({ message: "pong" });
});

export default app;
