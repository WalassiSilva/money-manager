import express from "express";
import { PrismaClient } from "@prisma/client";

const port = 3000;
const app = express();
const prisma = new PrismaClient();
app.use(express.json());

//--------- GET ALL TRANSACTIONS-----------
app.get("/api/getall", async (_, res) => {
  const getall = await prisma.transaction.findMany({
    orderBy: {
      day: "desc",
    },
    include: {
      categories: true,
    }

  });
  res.json(getall);
});

// -------- POST NEW TRANSACTION -----------
app.post("/api/post", async (req, res) => {
  const { title, value, category_id, day, type } = req.body;

  try {
    await prisma.transaction.create({
      data: {
        title,
        value,
        category_id,
        type,
        day: new Date(day)
      }
    });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao cadastrar uma transação" });
  }

  res.status(201).send();
});



app.listen(port, () => console.log(`Running in http://localhost:${port}`));