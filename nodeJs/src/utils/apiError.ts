import httpStatus from "http-status";

export default class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;
    error: string;

    constructor(
        statusCode: number,
        error: string,
        isOperational = true,
        stack = ""
    ) {
        super(error);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.error = error;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
