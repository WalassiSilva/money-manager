import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import "dotenv/config";
// import {transactionsPool} from "../../DBConfig";

const port = 3001;
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());



//--------- GET TRANSACTIONS BY ID---------
app.get("/api/transactions/id/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const target = await prisma.transaction.findUnique({ where: { id } });
    if (!target) return res.status(404).send({ message: "Id da Transação não encontrado" });
    return res.status(200).json({ target });
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar transação por di" });
  }

});

//--------- GET ALL TRANSACTIONS-----------
app.get("/api/transactions", async (_, res) => {
  const filterResult = await prisma.transaction.findMany({
    orderBy: {
      day: "desc",
    },
    include: {
      categories: { select: { title: true } },
    },

  });

  const resultsFinded = filterResult.length;
  setExpensesAsNegative(filterResult);
  const totalValue = sumValues(filterResult);

  res.json({ resultsFinded, totalValue, filterResult });
});

// -------- GET CATEGORIES ------------
app.get("/api/categories", async (_, res) => {
  const filterResult = await prisma.category.findMany({
    orderBy: { id: "asc" }
  });

  res.json(filterResult);
});

// -------- POST NEW TRANSACTION -----------
app.post("/api/transactions", async (req, res) => {
  const { title, value, category_id, day, type } = req.body;

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        title,
        value,
        category_id,
        type,
        day: new Date(day)
      }
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao cadastrar uma transação" });
  }
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
      data: data
    });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar transação" });
  }
  res.status(200).send({ message: "Atualização concluída!" });
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
    const filterResult = await prisma.transaction.findMany({
      include: { categories: { select: { title: true } } },
      where: {
        categories: {
          title: {
            equals: categoryTitle, mode: "insensitive"
          }
        },
      },
      orderBy: {
        day: "desc"
      }
    });

    setExpensesAsNegative(filterResult);
    const resultsFinded = filterResult.length;
    const totalValue = sumValues(filterResult);

    res.status(200).json({ resultsFinded, totalValue, filterResult });
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

    setExpensesAsNegative(filterResult);
    const resultsFinded = filterResult.length;
    const totalValue = sumValues(filterResult);

    res.status(200).json({ resultsFinded, totalValue, filterResult });
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
    const filterResult = await prisma.transaction.findMany({
      where: {
        day: {
          lt: new Date(finalDay),
          gte: new Date(initialDay)
        }
      },
      orderBy: [
        { day: "desc" },
        { id: "desc" }
      ]


    });
    setExpensesAsNegative(filterResult);

    const balance = getBalance(filterResult);

    res.status(200).json({ balance, filterResult });
  }
  catch (error) {
    return res.status(500).send({ message: "Erro ao filtrar por mês" });
  }
});

// -------- FILTER TRANSACTIONS BY NAME ------------
app.get("/api/transactions/filterTitle/:title", async (req, res) => {

  const title = req.params.title;

  try {
    const filterResult = await prisma.transaction.findMany({
      where: { title: { contains: title, mode: "insensitive" } },
      orderBy: { day: "desc" }
    });

    setExpensesAsNegative(filterResult);

    const resultsFinded = filterResult.length;

    const totalValue = sumValues(filterResult);

    return res.json({ resultsFinded, totalValue, filterResult });

  } catch (error) {
    return res.status(500).send({ message: "Error ao Pesquisar pelo titulo" });
  }
});

// -------- GROUP BY CATEGORY ------------
app.get("/api/transactions/categories/:year/:month", async (req, res) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const initialDay = new Date(`${year}-${month}-01`);
  const finalDay = (month !== 12)
    ? new Date(`${year}-${month + 1}-01`)
    : new Date(`${year + 1}-01-01`);

  try {
    const filterResult = await prisma.$queryRaw`
      select  c.title Category, c.id, sum(t.value)
      from transactions t 
      left outer join categories c on c.id = t.category_id 
      where t.day between ${initialDay} and ${finalDay} and t.type = 0
      group by c.id 
      order by c.id
    `;

    /*      select  c.title Category, sum(t.value)
      from transactions t 
      left outer join categories c on c.id = t.category_id 
      where t.day between  ${initialDay} and ${finalDay}
      group by c.title*/

    res.status(200).json(filterResult);
  } catch (error) {
    return res.status(500).send({ message: "Erros ao agrupar por categorias" });
  }

});

// -------- GET PATRIMONY ------------
app.get("/api/transactions/patrimony/:year/:month", async (req, res) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const finalDay = (month !== 12)
    ? new Date(`${year}-${month + 1}-01`)
    : new Date(`${year + 1}-01-01`);

  try {
    const result = await prisma.transaction.findMany({
      where: {
        day: {
          lt: new Date(finalDay)
        }
      },
      orderBy: [
        { day: "desc" },
        { id: "desc" }
      ]
    });
    setExpensesAsNegative(result);
    const totalValue = sumValues(result);
    const balance = getBalance(result);

    console.log(result);
    res.status(200).json({ totalValue, balance, result });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao Somar patrimonio" });
  }
});




app.listen(port, () => console.log(`Running in http://localhost:${port}`));

function getBalance(filterResult: { id: number; title: string | null; value: number | null; day: Date | null; category_id: number | null; type: number | null; }[]) {
  const balance = { incomes: 0, expenses: 0, result: 0 };
  for (const item of filterResult) {
    if (item.type === 1) balance.incomes += item.value!;
    if (item.type === 0) balance.expenses += item.value!;
  }
  balance.result = balance.incomes + balance.expenses;
  return balance;
}

function sumValues(filterResult: { id: number; title: string | null; value: number | null; day: Date | null; category_id: number | null; type: number | null; }[]) {
  let totalValue = 0;
  for (const item of filterResult) {
    totalValue += item.value!;
  }
  return totalValue;
}

function setExpensesAsNegative(filterResult: { id: number; title: string | null; value: number | null; day: Date | null; category_id: number | null; type: number | null; }[]) {
  for (const item of filterResult) {
    if (item.type === 0) {
      item.value! *= -1;
    }
  }
}
