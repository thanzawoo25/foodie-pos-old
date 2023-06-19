import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken"
import { config } from "../src/config/config";

 const checkAuth = (request: Request, response: Response, next: NextFunction) => {
    const headers = request.headers;
    const authorization = headers.authorization;
    if (!authorization) return response.send(401);
    try {
        const token = authorization.split(" ")[1]
    const user = jwt.verify(token, config.jwtSecret)
    
     //@ts-ignore
    request["email"] = user.email;
    next()
    } catch (error) {
        console.log("Error",error)
        response.sendStatus(401)
    }
    
}

export default checkAuth;