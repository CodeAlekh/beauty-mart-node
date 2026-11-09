import express from "express";
import { env } from "./config/env.ts";
import { notFound } from "./middlewares/notFound.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ name: "Pokkam Beauty Mart" });
});

app.use(notFound);
app.use(errorHandler);

app.listen(env.port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server running at port localhost:${env.port}`);
});
