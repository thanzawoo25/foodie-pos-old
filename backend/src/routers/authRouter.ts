
import express, { Request, Response } from "express";

const authRouter = express.Router()
import { db } from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";


// authRouter.post("/register", async (request:Request, response:Response) => {
//     // console.log(req.body)
//     // res.send(req.body)
//     const { name, email, password } = request.body;
//     if (!name || !email || !password) return response.sendStatus(400)
//     const hashedPassword = await bcrypt.hash(password, 10)
    
//     try {
//         const companiesResult = await db.query(
//             "insert into  companies (name) values ($1) returning *",
//             ["Default company"]
//         )
//         console.log(companiesResult.rows)
//         const companiesId = companiesResult.rows[0].id;

//         const text = 'INSERT INTO users(name, email,password,companies_id) VALUES($1, $2,$3,$4) RETURNING *'
//         //const values = [name, email, password]
//         const values = [name, email, hashedPassword, companiesId]
//         const userResult = await db.query(text, values);
//         const user = userResult.rows[0];
//         delete user.password

//         const locationResult = await db.query(
//             "insert into locations (name,address,companies_id) values ($1,$2,$3) returning *",
//             ["Default location","Default address",companiesId]
//         )
//         const locationId = locationResult.rows[0].id;

//         const menuResult = await db.query(
//             "insert into menus (name,price) select * from unnest ($1::text[],$2::int[]) returning *",
//             [
//                 ["monte-hinn-kharr", "shan-khout-swell"],
//                 [500, 1000]
//             ]
//         );
//         const menus = menuResult.rows
//         const defaultMenuId1=menus[0].id
//         const defaultMenuId2 = menus[1].id
        
//         await db.query(
//             "insert into menus_locations (menus_id,locations_id) select * from unnest ($1::int[],$2::int[]) returning *",
//             [
//                 [defaultMenuId1, defaultMenuId2],
//                 [locationId, locationId]
//             ]
//         );

//         const menuCategoriesResult = await db.query(
//             "insert into menu_categories (name) values ('defaultMenuCagegory1'),('defaultMenuCagegory2') returning * ",
//         );

//         const defaultMenuCagegories = menuCategoriesResult.rows;
//         const defaultMenuCategoryId1 = defaultMenuCagegories[0].id;
//         const defaultMenuCategoryId2 = defaultMenuCagegories[1].id;

//         await db.query(
//             `insert into menus_menu_categories (menus_id,menu_categories_id) values (${defaultMenuId1},${defaultMenuCategoryId1}),(${defaultMenuId2},${defaultMenuCategoryId2}) `
//         );

//         const defaultAddonCategoriesResult = await db.query(
//             "insert into addon_categories (name,is_required) values ('Drinks',true),('Sizes',true) returning *"
//         );

//         const addonCategoriesIds = defaultAddonCategoriesResult.rows;
//         const defaultAddonCategoryId1 = addonCategoriesIds[0].id;
//         const defaultAddonCategoryId2 = addonCategoriesIds[1].id;
//         await db.query(
//             `insert into menus_addon_categories (menus_id,addon_categories_id) values (${defaultMenuId1},${defaultAddonCategoryId1}),(${defaultMenuId2}.${defaultAddonCategoryId2})`
//         )

//         await db.query(
//             `insert into addons (name,price,addon_categories_id ) values ('Cocacola',50,${defaultAddonCategoryId1}),('Pepsi',50,${defaultAddonCategoryId1})
//             ('Large',30,${defaultAddonCategoryId2}),('Nomal',0,${defaultAddonCategoryId2})`
//         )
//         response.send(user)

//     } catch (error) {
//         console.log(error)
//         response.sendStatus(500)
//     }

//     // const text = 'INSERT INTO users(name, email,password) VALUES($1, $2,$3) RETURNING *'
//     // //const values = [name, email, password]
//     // const values = [name, email, hashedPassword]
//     // try {
//     //     const userResult = await db.query(text, values)
//     //     //console.log(userResault.rows)
//     //     //res.send({name, email, password});
//     //     const userInfo = userResault.rows[0];
//     //     delete userInfo.password;
//     //     res.send(userInfo)
//     // } catch (error) {
//     //     res.sendStatus(500)
//     // }
    
// })

authRouter.post("/register", async (req: Request, res: Response) => {
  // console.log(req.body)
  // res.send(req.body)
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.sendStatus(400);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const companiesResult = await db.query(
      "insert into  companies (name) values ($1) returning *",
      ["Default company"]
    );
    // console.log(companiesResult.rows);
    const companiesId = companiesResult.rows[0].id;

    const userResults = await db.query(
      "insert into users (name, email, password, companies_id) values ($1, $2, $3, $4) returning *",
      [name, email, hashedPassword, companiesId]
    );
    const user = userResults.rows[0];
    delete userResults.rows[0].password;

    const locationResult = await db.query(
      "insert into locations (name,address,companies_id) values ($1,$2,$3) returning *",
      ["Default location", "Default address", companiesId]
    );
    const locationId = locationResult.rows[0].id;

    const menuResult = await db.query(
      "insert into menus (name,price) select * from unnest ($1::text[],$2::int[]) returning *",
      [
        ["monte-hinn-kharr", "shan-khout-swell"],
        [500, 1000],
      ]
    );
    const menus = menuResult.rows;
    const defaultMenuId1 = menus[0].id;
    const defaultMenuId2 = menus[1].id;
    // console.log("Menus: ", menus);

    const menuLocationResults = await db.query(
      "insert into menus_locations (menus_id, locations_id) select * from unnest ($1::int[],$2::int[]) returning *",
      [
        [defaultMenuId1, defaultMenuId2],
        [locationId, locationId],
      ]
    );
    // console.log("menuLocationResults: ...", menuLocationResults.rows);

    const menuCategoriesResult = await db.query(
      "insert into menu_categories (name) values ('defaultMenuCagegory1'),('defaultMenuCagegory2') returning * "
    );

    const defaultMenuCagegories = menuCategoriesResult.rows;
    const defaultMenuCategoryId1 = defaultMenuCagegories[0].id;
    const defaultMenuCategoryId2 = defaultMenuCagegories[1].id;
    // console.log("DefaultMenuCategories: ", defaultMenuCagegories);

    await db.query(
      `insert into menus_menu_categories (menus_id,menu_categories_id) values (${defaultMenuId1},${defaultMenuCategoryId1}),(${defaultMenuId2},${defaultMenuCategoryId2}) `
    );

    const defaultAddonCategoriesResult = await db.query(
      "insert into addon_categories (name,is_required) values ('Drinks',true),('Sizes',true) returning *"
    );
    const addonCategoriesIds = defaultAddonCategoriesResult.rows;
    const defaultAddonCategoryId1 = addonCategoriesIds[0].id;
    const defaultAddonCategoryId2 = addonCategoriesIds[1].id;
    // console.log(
    //   "DefalultAddonCategoryResults: ",
    //   defaultAddonCategoriesResult.rows
    // );

    await db.query(
      "insert into menus_addon_categories (menus_id, addon_categories_id) select * from unnest ($1::int[], $2::int[])",
      [
        [defaultMenuId1, defaultMenuId2],
        [defaultAddonCategoryId1, defaultAddonCategoryId2],
      ]
    );

    await db.query(
      "insert into addons (name, price, addon_categories_id) select * from unnest ($1::text[], $2::int[], $3::int[])",
      [
        ["Cola", "Pepsi", "Large", "Normal"],
        [50, 50, 30, 0],
        [
          defaultAddonCategoryId1,
          defaultAddonCategoryId1,
          defaultAddonCategoryId2,
          defaultAddonCategoryId2,
        ],
      ]
    );

    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
authRouter.post("/login", async (req: Request, res: Response) => {
    
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
export default authRouter;