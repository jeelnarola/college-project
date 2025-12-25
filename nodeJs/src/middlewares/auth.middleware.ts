import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import ApiError from "../utils/apiError.js";

interface JwtUserPayload {
    id: string;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const decoded = jwt.verify(
            token,
            secret
        ) as unknown as JwtUserPayload;

        req.user = decoded;
        next();
    } catch (error) {
        next(error); // 🔥 let global error handler handle it
    }
};

export default auth;
