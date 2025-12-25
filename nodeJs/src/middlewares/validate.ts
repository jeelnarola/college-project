import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import httpStatus from "http-status";
import ApiError from "../utils/apiError.js";
const validate = (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(
      {
        body: req.body,
        params: req.params,
        query: req.query,
      },
      {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
      }
    );

    if (error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        error.details.map(d => d.message).join(", ")
      );
    }

    req.body = value.body;
    req.params = value.params;
    req.query = value.query;

    next();
  };

export default validate;
