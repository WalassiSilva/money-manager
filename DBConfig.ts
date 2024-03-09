import pg from "pg";
const { Pool} = pg; 
export const transactionsPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthoridez: false
  }
});
export const categoriesPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthoridez: false
  }
});