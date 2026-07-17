// const express = require("express");
import express from "express";
import type { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middleware/error-handler";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
