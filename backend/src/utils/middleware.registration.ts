import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import * as env from "../environment";
import jsConfig = require("../swagger.json");

const allowList: string[] = [
    'http://localhost:4200',
    env.allowedCors,
];

const corsOptions: cors.CorsOptions = {
    origin: allowList
};

function TimingMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(`Time: ${Date.now()} Url: ${env.baseUrl}:${env.port}${req.url}`);
    next();
}

export function RegisterMiddleware(app: express.Express) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors(corsOptions));
    app.use(TimingMiddleware);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(jsConfig));
}