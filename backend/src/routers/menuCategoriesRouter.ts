import express, { Request, Response } from "express";
import checkAuth from "../../utils/auth";
import { db } from "../db/db";
const menuCategoriesRouter = express.Router();

menuCategoriesRouter.put(
  "/",
  checkAuth,
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

menuCategoriesRouter.put(
  "/removedMenu",
  checkAuth,
  async (request: Request, response: Response) => {
    const { menuId, menuCategoryId, locationId } = request.body;
    const isValid = menuId && menuCategoryId && locationId;
    if (!isValid) return response.send(400);

    const menusMenuCategoriesLocations = await db.query(
      "select * from menus_menu_categories_locations where menus_id=$1 and menu_categories_id =$2 and locations_id =$3",
      [menuId, menuCategoryId, locationId]
    );
    const hasMenusMenuCategoriesLocations =
      menusMenuCategoriesLocations.rows.length;
    if (!hasMenusMenuCategoriesLocations) return response.send(400);

    await db.query(
      "update menus_menu_categories_locations set is_archived = true where menus_id=$1 and menu_categories_id =$2 and locations_id =$3",
      [menuId, menuCategoryId, locationId]
    );
    response.send(200);
  }
);

menuCategoriesRouter.put(
  "/addedMenu",
  checkAuth,
  async (request: Request, response: Response) => {
    const { menuId, menuCategoryId, locationId } = request.body;
    const isValid = menuId && menuCategoryId.length && locationId.length;
    if (!isValid) return response.send(400);

    menuId.forEach((menuId: number) => {
      locationId.forEach(async (locationId: number) => {
        const menusMenuCategoriesLocations = await db.query(
          "select * from menus_menu_categories_locations where menus_id=$1 and menu_categories_id =$2 and locations_id =$3",
          [menuId, menuCategoryId, locationId]
        );
        const isExisted = menusMenuCategoriesLocations.rows.length;
        if (isExisted) {
          await db.query(
            "update menus_menu_categories_locations set is_archived = false where menus_id=$1 and menu_categories_id =$2 and locations_id =$3",
            [menuId, menuCategoryId, locationId]
          );
        } else {
          await db.query(
            "insert into menus_menu_categories_locations (menus_id,menu_categories_id,locations_id) values ($1,$2,$3)",
            [menuId, menuCategoryId, locationId]
          );
        }
      });
    });

    response.send(200);
  }
);

menuCategoriesRouter.delete(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const isValid = request.params.id && request.body.locationId;
    if (!isValid) return response.send(400);
    const menuCategoryId = request.params.id as string;
    const locationId = request.body.locationId as string;

    const menusMenuCategoriesLocations = await db.query(
      "select * from menus_menu_categories_locations where menu_categories_id = $1 and locations_id = $2",
      [menuCategoryId, locationId]
    );
    const hasMenusMenuCategoriesLocations =
      menusMenuCategoriesLocations.rows.length;
    if (!hasMenusMenuCategoriesLocations) return response.send(400);
    menusMenuCategoriesLocations.rows.forEach(async (item) => {
      const menusMenuCategoriesLocationsId = item.id;
      await db.query(
        "update menus_menu_categories_locations set is_archived = true where id = $1 ",
        [menusMenuCategoriesLocationsId]
      );
    });
    response.send(200);
  }
);

menuCategoriesRouter.post(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    const { name, locationIds } = request.body;
    const isValid = name && locationIds.length;
    if (!isValid) return response.send(400);

    const newMenuCategoryResult = await db.query(
      "insert into menu_categories (name) values ($1) returning *",
      [name]
    );
    const newMenuCategoryId = newMenuCategoryResult.rows[0].id;
    locationIds.forEach(
      async (item: number) =>
        await db.query(
          "insert into menus_menu_categories_locations (menu_categories_id,locations_id) values ($1,$2) returning *",
          [newMenuCategoryId, item]
        )
    );
    response.send(200);
  }
);
export default menuCategoriesRouter;
