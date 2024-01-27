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
    if (!targetTransaction) {
      return res.status(404).send({ message: "Id da transação não encontrado" });
    }

    await prisma.transaction.delete({ where: { id } });
  } catch (error) {
    res.status(500).send({ message: "Erro ao tentar deletar transaçaõ" });
  }

  res.status(200).send();
});

// -------- FILTER ALL TRANSACTIONS BY CATEGORY --------
app.get("/api/transactions/filterAll/:categoryTitle", async (req, res) => {
  const categoryTitle = req.params.categoryTitle;

  try {
    const filteredCategory = await prisma.transaction.findMany({
      include: { categories: true },
      where: {
        categories: {
          title: {
            equals: categoryTitle, mode: "insensitive"
          }
        }
      },
      orderBy: {
        day: "desc"
      }
    });

    res.status(200).send(filteredCategory);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao filtrar por Categoria" });
  }
});
// -------- FILTER TRANSACTIONS BY MONTH AND CATEGORY -----------
app.get("/api/transactions/filter/month/:category/:year/:month", async (req, res) => {
  const category = req.params.category;
  const month = Number(req.params.month);
  const year = Number(req.params.year);
  const initialDay = new Date(`${year}-${month}-01`);
  const finalDay = (month !== 12)
    ? new Date(`${year}-${month + 1}-01`)
    : new Date(`${year + 1}-01-01`);

  try {
    const filterResult = await prisma.transaction.findMany({
      where: {
        AND: [
          {
            day: {
              lt: new Date(finalDay),
              gte: new Date(initialDay)
            }
          },
          {
            categories: {
              title: {
                equals: category, mode: "insensitive"
              }
            }
          }
        ],
      },
      orderBy: { day: "desc" }
    });

    res.status(200).send(filterResult);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao Filtrar por categoria e mês" });
  }

});

// -------- FILTER TRANSACTIONS BY MONTH -----------

app.get("/api/transactions/filter/:year/:month", async (req, res) => {

  const month = Number(req.params.month);
  const year = Number(req.params.year);
  const initialDay = new Date(`${year}-${month}-01`);
  const finalDay = (month !== 12)
    ? new Date(`${year}-${Number(month) + 1}-01`)
    : new Date(`${year + 1}-01-01`);

  try {
    const filteredMonth = await prisma.transaction.findMany({
      where: {
        day: {
          lt: new Date(finalDay),
          gte: new Date(initialDay)
        }
      },
      orderBy: {
        day: "desc"
      }

    });
    res.status(200).send(filteredMonth);
  }
  catch (error) {
    return res.status(500).send({ message: "Falha ao filtrar por mês" });
  }
});


// -------- FILTER TRANSACTIONS BY NAME ------------
app.listen(port, () => console.log(`Running in http://localhost:${port}`));