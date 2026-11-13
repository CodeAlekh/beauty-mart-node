import express from "express";
import { env } from "./config/env.ts";
import { notFound } from "./middlewares/notFound.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import { prisma } from "./config/prisma.ts";
import { adminRouter } from "./routes/admin.routes.ts";
import { productRouter } from "./routes/product.routes.ts";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ name: "Pokkam Beauty Mart" });
});

//Route to admin endpoints
app.use("/admin", adminRouter);
app.use("/product", productRouter);

app.use(notFound);
app.use(errorHandler);

await prisma.$queryRaw`SELECT 1`;
console.log("Connected to the database...");

app.listen(env.port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server running at port localhost:${env.port}`);
});
