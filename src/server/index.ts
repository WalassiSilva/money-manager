import express from "express";
const app = express();

app.get("/api/hi", (req, res) => res.send("Hello wolrd!"))

app.listen(3000, () => console.log("Started"));