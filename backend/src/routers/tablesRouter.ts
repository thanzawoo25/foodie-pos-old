import express, { Request, Response, response } from "express";
import { db } from "../db/db";
import checkAuth from "../../utils/auth";
const menusRouter = express.Router();

menusRouter.get(
  "/:locationId",
  checkAuth,
  async (request: Request, response: Response) => {
    const locationId = request.params.locationId;
    if (!locationId) return response.send(400);
    const tableResult = await db.query(
      "select * from tables where locations_id =$1",
      [locationId]
    );
    response.send(tableResult.rows);
  }
);

menusRouter.post(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    const { name, locationId } = request.body;
    const isValid = request.body;
    if (!isValid) return response.send(400);
    const tableResult = await db.query(
      "insert into tables (name,locations_id) values ($1,$2) returning *",
      [name, locationId]
    );
    response.send(200);
    //response.send(tableResult.rows);
  }
);

export default menusRouter;
