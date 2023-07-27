import express, { Request, Response, response } from "express";
import { db } from "../db/db";
import checkAuth from "../../utils/auth";
const menuCategoriesRouter = express.Router();

menuCategoriesRouter.put(
  "/",

  async (request: Request, response: Response) => {
    const { id, name, locationIds } = request.body;
    if (!id) return response.send(400);
    console.log("Body", request.body);

    if (name) {
      await db.query("update menu_categories set name = $1 where id= $2 ", [
        name,
        id,
      ]);
      return response.send(200);
    }

    const existingLocationResultRows = await db.query(
      "select locations_id from menus_menu_categories_locations where menu_categories_id=$1",
      [id]
    );
    const existingLocationIds = existingLocationResultRows.rows.map(
      (item) => item.locations_id
    );
    console.log("existingLocationIds", existingLocationIds);

    const removedLocationIds = existingLocationIds.filter(
      (item) => !locationIds.includes(item)
    );
    console.log("removedLocationIds", removedLocationIds);

    if (removedLocationIds.length) {
      removedLocationIds.forEach(async (item) => {
        await db.query(
          "update menus_menu_categories_locations set is_archived = true where menu_categories_id =$1 and locations_id =$2",
          [Number(id), item]
        );
      });
    }

    const addedLocationIds = locationIds.filter((item: number) =>
      existingLocationIds.includes(item)
    );
    if (addedLocationIds.length)
      addedLocationIds.forEach(async (item: number) => {
        await db.query(
          "insert into menus_menu_categories_locations (menu_categories_id,locations_id) values ($1,$2)",
          [id, item]
        );
      });
    response.send(200);
  }
);

export default menuCategoriesRouter;