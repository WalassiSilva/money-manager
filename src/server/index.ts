import express from "express";

const port = 3000;
const app = express();

app.get("/api/getall", (req, res) => {
  res.send("Get all transactions");
});

app.listen(port, () => console.log(`Running in http://localhost:${port}`));