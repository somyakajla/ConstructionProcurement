import express from "express";
import { IController } from "../controllers/controller.interface";
import { UserController } from "../controllers/user.controller";
import { ProjectController } from "../controllers/project.controller";
import { BidController } from "../controllers/bid.controller";

const controllers: IController[] = [
    new UserController(),
    new ProjectController(),
    new BidController()
];

export function RegisterControllers(app: express.Express) {
    controllers.forEach(controller => {
        app.use(controller.route, controller.router);
    });
}