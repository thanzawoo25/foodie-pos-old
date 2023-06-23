
import express, { Request, Response, response } from "express";
import { db } from "../db/db";
import checkAuth from "../../utils/auth";
const locationsRouter = express.Router();


locationsRouter.put("/",checkAuth, async (request: Request, response: Response) => {
    const menuResult = await db.query("select * from menus");
    response.send(menuResult.rows)
})

locationsRouter.post("/",checkAuth, async (request: Request, response: Response) => {
    const { name, address, companyId } = request.body
    const isValid = name && address && companyId;
    if (!isValid) return response.send(400)
    
    await db.query(
        "insert into locations(name,address,companies_id) values($1,$2,$3)",
        [name,address,companyId]
    )
    response.send(200)
})
export default locationsRouter;