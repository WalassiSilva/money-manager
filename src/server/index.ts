import express from "express";
import { PrismaClient } from "@prisma/client";

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.get("/api/getall", async (req, res) => {
  const getall = await prisma.transaction.findMany();
  res.json(getall);
});

app.listen(port, () => console.log(`Running in http://localhost:${port}`));