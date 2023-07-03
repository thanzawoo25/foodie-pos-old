import express, { Request, Response, response } from "express";
import { db } from "../db/db";
import checkAuth from "../../utils/auth";
const menusRouter = express.Router();

menusRouter.get(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    const menuResult = await db.query("select * from menus");
    response.send(menuResult.rows);
  }
);

menusRouter.post(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    const { name, description, price, assetUrl } = request.body;
    const newMenuResult = await db.query(
      "insert into menus (name,description,price,asset_url) values ($1,$2,$3,$4) returning *",
      [name, description, price, assetUrl]
    );
    response.send(newMenuResult.rows);
  }
);

export default menusRouter;
