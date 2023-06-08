import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken"
import { config } from "../src/config/config";

export const checkAuth = (request: Request, response: Response, next: NextFunction) => {
    const headers = request.headers;
    //console.log(headers);
    const authorization = headers.authorization;
    if (!authorization) return response.send(401);
    try {
        const token = authorization.split(" ")[1]
    const isValidToken = jwt.verify(token, config.jwtSecret)
    //return isValidToken ? next(): response.send(40)
    next()
    } catch (error) {
        response.sendStatus(401)
    }
    
}