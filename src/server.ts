import app from "./app.js";

// app and server are split to avoid an import of app
// starting the server as a side-effect
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`),
);
