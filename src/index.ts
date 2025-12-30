import express from 'express';

const app = express();

app.get('/ping', (_req, res) => {
  res.json({ message: 'pong' });
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

export default app;
