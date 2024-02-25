import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";

config();
const app = express();

// TODO: remove morgan in production
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", appRouter)


export default app;