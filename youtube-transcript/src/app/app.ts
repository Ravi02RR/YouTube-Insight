import dotenv from "dotenv";
dotenv.config();

import cors from "cors"


import express from "express";
import transcriptRouter from "../routes/transcript.route";
import { errorMiddleware } from "../error.middleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/transcript", transcriptRouter);

app.use(errorMiddleware);

export default app;
