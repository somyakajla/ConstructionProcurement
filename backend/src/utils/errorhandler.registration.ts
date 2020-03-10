import express from "express";
import { HttpException } from "../errors/httpexception.error";

function BaseErrorHandler(
    error: HttpException,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response
        .status(status)
        .send({
            status,
            message,
        });
}

export function RegisterErrorMiddleware(app: express.Express) {
    app.use(BaseErrorHandler);
}