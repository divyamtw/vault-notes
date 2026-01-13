import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config({
  path: "./.env",
});

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/", (_, res) => {
  res.send("Hello World!");
});

export default app;
