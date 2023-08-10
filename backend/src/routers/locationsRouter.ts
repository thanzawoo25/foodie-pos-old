import express, { Request, Response } from "express";
import checkAuth from "../../utils/auth";
import { db } from "../db/db";
const locationsRouter = express.Router();

locationsRouter.put(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    const menuResult = await db.query("select * from menus");
    response.send(menuResult.rows);
  }
);

locationsRouter.post(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    console.log(request.body);

    const { name, address, companyId } = request.body;
    const isValid = name && address && companyId;
    if (!isValid) return response.send(400);

    await db.query(
      "insert into locations(name,address,companies_id) values($1,$2,$3)",
      [name, address, companyId]
    );
    response.send(200);
  }
);

locationsRouter.put(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const locationId = request.params.id;
    const { name, address } = request.body;

    if (name && !address) {
      const updateLocation = await db.query(
        "update locations set name=$1 where id=$2",
        [name, locationId]
      );
    } else if (address && !name) {
      const updateLocation = await db.query(
        "update locations set address=$1 where id=$2",
        [address, locationId]
      );
    } else if (name && address) {
      const updateLocation = await db.query(
        "update locations set name=$1,address=$2 where id=$3",
        [name, address, locationId]
      );
    } else {
      response.sendStatus(400);
    }
    response.send({ Message: "UPDATE......" });
  }
);
locationsRouter.delete(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const locationId = request.params.id;
    if (!locationId) return response.send(400);
    const existingLocations = await db.query(
      "select * from locations where id = $1 ",
      [locationId]
    );
    const hasExistingLocation = existingLocations.rows.length;
    if (!hasExistingLocation) return response.send(400);
    await db.query("update locations set is_archived = true where id =$1", [
      locationId,
    ]);
    response.send(200);
  }
);
export default locationsRouter;
