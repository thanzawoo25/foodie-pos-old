import express, { Request, Response } from "express";
import checkAuth from "../../utils/auth";
import { db } from "../db/db";
const tablesRouter = express.Router();

tablesRouter.get(
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

tablesRouter.post(
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
tablesRouter.put(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const tableId = request.params.id;
    const { name } = request.body;
    const isValid = name && tableId;
    if (!isValid) return response.send(400);

    const existingTable = await db.query("select * from tables where id = $1", [
      tableId,
    ]);
    const hasExistingTable = existingTable.rows.length > 0;
    if (!hasExistingTable) return response.send(400);
    await db.query("update tables set name = $1  where id = $2", [
      name,
      tableId,
    ]);
    response.send(200);
  }
);

tablesRouter.delete(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const tableId = request.params.id;
    if (!tableId) return response.send(400);
    const existingTable = await db.query("select * from tables where id = $1", [
      tableId,
    ]);
    const hasExistingTable = existingTable.rows.length;
    if (!hasExistingTable) return response.send(400);

    await db.query("update tables set is_archived = true where id = $1", [
      tableId,
    ]);
    response.send(200);
  }
);

export default tablesRouter;
