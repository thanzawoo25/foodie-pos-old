import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "./src/config/config";
import authRouter from "./src/routers/authRouter";
import menusRouter from "./src/routers/menusRouter";
import appRouter from "./src/routers/appRouter";
import locationsRouter from "./src/routers/locationsRouter";
import tablesRouter from "./src/routers/tablesRouter";
console.log(config.jwtSecret);

//console.log(process.env)
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/", appRouter);
app.use("/auth", authRouter);
app.use("/menus", menusRouter);
app.use("/locations", locationsRouter);
app.use("/tables", tablesRouter);

app.listen(port, () => {
  console.log("server is starting on port:", port);
});
