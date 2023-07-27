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
    console.log("AssetURl", request.body);
    const { name, description, price, assetUrl, locationId, menuCategoryIds } =
      request.body;

    const isValid = name && description && locationId && menuCategoryIds.length;

    const newMenuResult = await db.query(
      "insert into menus (name,description,price,asset_url) values ($1,$2,$3,$4) returning *",
      [name, description, price, assetUrl]
    );

    const menuId = newMenuResult.rows[0].id;
    menuCategoryIds.forEach(async (item: number) => {
      await db.query(
        "insert into menus_menu_categories_locations (menus_id,menu_categories_id,locations_id) values ($1,$2,$3)",
        [menuId, item, Number(locationId)]
      );
    });

    response.send(newMenuResult.rows);
  }
);

export default menusRouter;
