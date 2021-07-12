import jwt from 'jsonwebtoken';
import express, { Response, Request, NextFunction } from "express";

/**
 * This function checks if the authorization header is present for routes that are protected and hence require that it be available.
 * If the authorization header is not set in the format 'Bearer jwt-token', an Unauthorized error will be thrown and the client will not be able to access the route
 */
const requireAuthentication = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.setHeader("WWW-Authenticate", "Bearer realm=all");
        return res.status(401).json({success: false, status: "unauthorized", message:"You are not authorized to access this resource"});
    }

    let token = req.headers.authorization.split(" ");
    if (token[0] !== 'Bearer') {
        return res.status(400).json({success: false, status: "invalid_token_type", message:"Token type is not valid. Should be of type bearer"});
    }
    jwt.verify(token[1], process.env.TOKEN_SECRET as string, {
        algorithms: ["HS256"],
    }, (err, decoded) => {
        if (err) {
            if (err.name == 'TokenExpiredError') {
                res.setHeader("WWW-Authenticate", "error = invalid_token error_description = the access token expired");
                return res.status(400).json({success: false, status: err.name, message: err.message})
            } else return res.status(400).json({success: false, status: "invalid_token", message: "Access token supplied is invalid"})
        }
        next();
    })
}
export default requireAuthentication;