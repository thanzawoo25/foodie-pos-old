
import express,{Request,Response, response} from "express";
import { request } from "http";
import { checkAuth } from "../../utils/Auth";
import { db } from "../db/db";

const appRouter = express.Router()

appRouter.get("/", checkAuth, async (request: Request, response: Response) => {
    //@ts-ignore
    const userEmail = request.email;
    
    try {
        //get user rows
        const userResult = await db.query(`select * from users where email = $1`, [
        
        userEmail
    ]);

    //get company rows and id
        const companyId = userResult.rows[0].companies_id;
        const companiesResult = await db.query(
            `select * from companies where id = $1`,
            [companyId]
        )

        //get locations rows and id

        const locations = await db.query(
            `select * from locations where companies_id =$1`,
            [companyId]
        ) 
        const locationIds = locations.rows.map(row => row.id);

        const menuLocations = await db.query(
            `select * from menus_locations where locations_id = $1`,
            [locationIds]
        )

        //get menu row and id

        const menuIds = menuLocations.rows.map((row) => row.menus_id);
        const menus = await db.query(
            `select * from menus where id = ANY($1::int[])`,
            [menuIds]
        ) 
        console.log(menuIds)

        //get menu categories ids and rows

        const menuMenuCategoriesResult = await db.query(
            `select * from menus_menu_categores where id menus_id = ANY($1::int[])`,
            [menuIds]
        )     
        const menuCategoryIds = menuMenuCategoriesResult.rows.map(row => row.menu_categores_id);
        
        const menuCategoriesResult = await db.query(
            `select * from menu_categories where id = ANY($1::int[])`,
            [menuCategoryIds],
        );
        


        //get addon categories

        const menuAddonCategoriesResult = await db.query(
            `select * from menus_addon_categories where menus_id = ANY($1::int[])`,
            [menuIds]
        )
        const addonCategoryIds = menuAddonCategoriesResult.rows.map(
            (row) => row.addon_categories_id
        );

        //addon
        const addonCategories = await db.query(
            `select * from addon_categories where id =ANY($1::int[])`,
            [addonCategoryIds]
        );

        const addons = await db.query(
            `select * from addons where addon_categories_id = ANY($1::int[])`,
            [addonCategoryIds]
        )

        const companyResult = await db.query(
            `select * from companies where id=$1`,
            [companyId]
        )

        const company = companiesResult.rows[0]

        response.send({
            menus: menus.rows,
            menuCategories: menuCategoriesResult.rows,
            addons: addons.rows,
            addonCategories: addonCategories.rows,
            locations: locations.rows,
            menuLocations: menuLocations.rows,
            company
        })
        
    } catch (error) {
        console.log("Error", error);
        response.sendStatus(500)
    }
    
    
})

export default appRouter;

