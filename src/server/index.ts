import express from "express";

const port = 3000;
const app = express();

app.get("/api/", (req, res) => {
  res.send("Hello wolrd!");
});

app.listen(port, () => console.log("Running in http://localhost:3000"));