import express, { Request, Response } from "express";
import checkAuth from "../../utils/auth";
import { db } from "../db/db";
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

menusRouter.put(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const { id, name, price, addonCategoryIds } = request.body;
    const isValid = id && name;
    console.log("addonCategoryIds", addonCategoryIds);
    // const menuId = request.params.id as string;

    if (!isValid) return response.send(400);
    await db.query(
      "update menus set name = $1, price=$2 where id =$3 returning *",
      [name, price, id]
    );
    const existingAddonCategoriesId = await db.query(
      "select addon_categories_id from menus_addon_categories where menus_id = $1",
      [id]
    );
    console.log("one", existingAddonCategoriesId);

    if (addonCategoryIds) {
      console.log("Two", addonCategoryIds);
      const removedAddonCategoriesId = existingAddonCategoriesId.rows.filter(
        (item) => !addonCategoryIds.includes(item.addon_categories_id)
      );
      if (removedAddonCategoriesId.length) {
        removedAddonCategoriesId.forEach(
          async (item: any) =>
            await db.query(
              "delete from menus_addon_categories where menus_id=$1 and addon_categories_id =$2",
              [id, item.addon_categories_id]
            )
        );
      }
      console.log("three", removedAddonCategoriesId);
      const addedAddonCategoriesIds = addonCategoryIds.filter(
        (item: number) => !existingAddonCategoriesId.rows.includes(item)
      );
      if (addedAddonCategoriesIds) {
        addedAddonCategoriesIds.forEach(async (item: number) => {
          await db.query(
            "insert into menus_addon_categories (menus_id,addon_categories_id) values ($1,$2)",
            [id, item]
          );
        });
      }
    }
    response.send(200);
  }
);

menusRouter.delete(
  "/:menuId",
  checkAuth,
  async (request: Request, response: Response) => {
    const menuId = request.params.menuId;
    if (!menuId) return response.send(400);
    await db.query("update menus set is_archived = true where id = $1", [
      menuId,
    ]);
    response.send(200);
  }
);

export default menusRouter;
