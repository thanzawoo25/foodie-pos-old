import express, { Request, Response } from "express";
import checkAuth from "../../utils/auth";
import { fileUpload } from "../../utils/fileUpload";
import { db } from "../db/db";
const appRouter = express.Router();

appRouter.get("/", checkAuth, async (request: Request, response: Response) => {
  //@ts-ignore
  const userEmail = request.email;

  try {
    //get user rows
    const userResult = await db.query(`select * from users where email = $1`, [
      userEmail,
    ]);

    //get company rows and id
    const companyId = userResult.rows[0].companies_id;
    const companiesResult = await db.query(
      `select * from companies where id = $1`,
      [companyId]
    );

    //get locations rows and id

    const locations = await db.query(
      `select * from locations where is_archived = false and companies_id =$1`,
      [companyId]
    );
    const locationIds = locations.rows.map((row) => row.id);

    const menusMenuCategoriesLocations = await db.query(
      `select * from menus_menu_categories_locations where is_archived = false and locations_id = ANY($1::int[])`,
      [locationIds]
    );

    //get menu row and id

    const menuIds = menusMenuCategoriesLocations.rows.map(
      (row) => row.menus_id
    );
    console.log(menuIds);

    const menus = await db.query(
      `select * from menus where id= ANY($1::int[]) and is_archived= false`,
      [menuIds]
    );

    //get menu categories ids and rows

    const menuCategoryIds = menusMenuCategoriesLocations.rows.map(
      (row) => row.menu_categories_id
    );

    const menuCategoriesResult = await db.query(
      "select * from menu_categories where id = ANY($1::int[])",
      [menuCategoryIds]
    );

    //get addon categories

    const menusAddonCategoriesResult = await db.query(
      `select * from menus_addon_categories where menus_id = ANY($1::int[])`,
      [menuIds]
    );
    const addonCategoryIds = menusAddonCategoriesResult.rows.map(
      (row) => row.addon_categories_id
    );

    //addon
    const addonCategories = await db.query(
      `select * from addon_categories where is_archived = false and id =ANY($1::int[])`,
      [addonCategoryIds]
    );

    const addons = await db.query(
      `select * from addons  where is_archived = false and addon_categories_id = ANY($1::int[])`,
      [addonCategoryIds]
    );

    const companyResult = await db.query(
      `select * from companies where id=$1`,
      [companyId]
    );

    const company = companiesResult.rows[0];
    const tableResult = await db.query(
      `select * from tables where is_archived = false and locations_id = ANY($1::int[])`,
      [locationIds]
    );

    response.send({
      menus: menus.rows,
      menuCategories: menuCategoriesResult.rows,
      addons: addons.rows,
      addonCategories: addonCategories.rows,
      locations: locations.rows,
      menuAddonCategories: menusAddonCategoriesResult.rows,
      menusMenuCategoriesLocations: menusMenuCategoriesLocations.rows,
      company,
      tables: tableResult.rows,
    });
  } catch (error) {
    console.log("Error", error);
    response.sendStatus(500);
  }
});

appRouter.post("/assets", (request: Request, response: Response) => {
  try {
    fileUpload(request, response, async (error) => {
      console.log("Hello", request.body);
      if (error) {
        console.log(error);
        return response.sendStatus(500);
      }
      const files = request.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      response.send({ assetUrl });
    });
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
});

export default appRouter;
