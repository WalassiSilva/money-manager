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
app.post("/api/transactions", async (req, res) => {
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


// -------- UPDATE TRANSACTION -----------
app.put("/api/transactions/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const targetTransaction = await prisma.transaction.findUnique({
      where: { id }
    });

    if (!targetTransaction) {
      return res.status(404).send({ message: "Transação não encontrada" });
    }

    const data = { ...req.body };

    data.day = data.day ? new Date(data.day) : undefined;

    await prisma.transaction.update({
      where: { id },
      data:
        data
    });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar transação" });
  }
  res.status(200).send();
});

// -------- DELETE TRANSACTION -----------
app.delete("/api/transactions/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const targetTransaction = await prisma.transaction.findUnique({ where: { id } });
    if(!targetTransaction){
      return res.status(404).send({message: "Id da transação não encontrado"});
    }

    await prisma.transaction.delete({where: {id}});
  } catch (error) {
    res.status(500).send({message: "Erro ao tentar deletar transaçaõ"});
  }

  res.status(200).send();
});

// -------- FILTER TRANSACTIONS BY CATEGORY --------
// -------- FILTER TRANSACTIONS BY MONTH -----------
// -------- FILTER TRANSACTIONS BY NAME ------------
app.listen(port, () => console.log(`Running in http://localhost:${port}`));