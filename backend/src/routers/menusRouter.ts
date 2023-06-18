
import express, { Request, Response, response } from "express";
import { db } from "../db/db";
import checkAuth from "../../utils/auth";
const menusRouter = express.Router();


menusRouter.get("/",checkAuth, async (request: Request, response: Response) => {
    const menuResult = await db.query("select * from menus");
    response.send(menuResult.rows)
})

// app.get("/menu-categories", async (req: Request, res: Response) => {
//     const menuResult = await db.query(`SELECT m.name,mc.name FROM menus as m
//   inner join menus_menu_categories as mmc ON mmc.menus_id = m.id
//   INNER JOIN menu_categories as mc 
//   on mc.id=mmc.menu_categories_id
// `);
//     res.send(menuResult.rows)
// })
export default menusRouter;