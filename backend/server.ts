
import dotenv from "dotenv";
dotenv.config()

import express, { Request, Response } from "express";
import { db } from "./src/db/db";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { config } from "./src/config/config";
import { checkAuth } from "./utils/Auth";
import authRouter from "./src/routers/authRouter";
import menusRouter from "./src/routers/menusRouter";
import appRouter from "./src/routers/appRouter";
console.log(config.jwtSecret)


//console.log(process.env)
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/",appRouter)
app.use("/auth", authRouter)
app.use("/menus",menusRouter)


app.listen(port, () => {
    console.log("server is starting on port:",port)
})
