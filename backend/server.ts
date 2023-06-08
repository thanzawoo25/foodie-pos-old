
import dotenv from "dotenv";
dotenv.config()

import express, { Request, Response } from "express";
import { db } from "./src/db/db";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { config } from "./src/config/config";
import { checkAuth } from "./utils/Auth";
console.log(config.jwtSecret)


//console.log(process.env)
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/menus", async (req: Request, res: Response) => {
    const menuResult = await db.query("select * from menus");
    res.send(menuResult.rows)
})
app.get("/menu-categories", async (req: Request, res: Response) => {
    const menuResult = await db.query(`SELECT m.name,mc.name FROM menus as m
  inner join menus_menu_categories as mmc ON mmc.menus_id = m.id
  INNER JOIN menu_categories as mc 
  on mc.id=mmc.menu_categories_id
`);
    res.send(menuResult.rows)
})

app.post("/auth/register", async (req:Request, res:Response) => {
    // console.log(req.body)
    // res.send(req.body)
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.sendStatus(400)
    const hashedPassword = await bcrypt.hash(password,10)
    const text = 'INSERT INTO users(name, email,password) VALUES($1, $2,$3) RETURNING *'
    //const values = [name, email, password]
    const values = [name, email, hashedPassword]
    try {
        const userResault = await db.query(text, values)
        //console.log(userResault.rows)
        //res.send({name, email, password});
        const userInfo = userResault.rows[0];
        delete userInfo.password;
        res.send(userInfo)
    } catch (error) {
        res.sendStatus(500)
    }
    
})


app.post("/auth/login", async (req: Request, res: Response) => {
    
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400)
    const userResault = await db.query("Select * from users where email =$1", [email]);
    if (!userResault.rows.length) return res.sendStatus(401);
    const user = userResault.rows[0];
    const hashedPassword = user.password
    delete user.password;
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword)
    if (isCorrectPassword) {
        //console.log(config.jwtSecret)
        const accessToken = jwt.sign(user, config.jwtSecret);
        return res.send({accessToken})
    }
    //return isCorrectPassword ? res.sendStatus(200) : res.sendStatus(401)
    return  res.sendStatus(401)

}

)
app.listen(port, () => {
    console.log("server is starting on port:",port)
})
