import * as express from 'express';
import { IController } from "./controller.interface";
import { HttpException } from '../errors/httpexception.error';
import { Project, IProject } from "../models/project.model";

export class ProjectController implements IController {
    public router = express.Router();
    public route = "/project";

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.getProjects);
        this.router.post("/", this.createProject);
        this.router.patch("/:id", this.updateProject);
        this.router.delete("/:id", this.deleteProject);
    }

    /**
     * @swagger
     *
     * /project:
     *   get:
     *     description: Get all projects
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/Project'
     */
    async getProjects(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const projects = await Project.find(req.query);
            res.json(projects);
        }
        catch (error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to get projects ${details}`));
        }
    }

    /**
     * @swagger
     *
     * /project:
     *   post:
     *     description: Create a new project
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: project
     *         description: Project object
     *         in: body
     *         required: true
     *         type: string
     *         schema:
     *             $ref: '#/definitions/Project'
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/Project'
     */
    async createProject(req: express.Request, res: express.Response, next: express.NextFunction) {
        const project: IProject = req.body;
        try {
            const result: IProject[] = await Project.create([project]);
            res.json(result);
        }
        catch (error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to create project ${details}`));
        }
    }

    /**
     * @swagger
     *
     * /project/{id}:
     *   patch:
     *     description: Update a project
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: project
     *         description: To be updated
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Project'
     *       - in: path
     *         name: id
     *         description: Project ID
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/Project'
     */
    async updateProject(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        const newInfo: IProject = req.body;
        try {
            const oldProject = await Project.findById(id);

            // remember to use $set!!
            await oldProject.updateOne({$set: newInfo});

            // findByIdAndUpdate will give you the old record
            const newProject = await Project.findById(id);
            res.json(newProject);
        }
        catch (error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to update project ${details}`));
        }
    }


    /**
     * @swagger
     *
     * /project/{id}:
     *   delete:
     *     description: Delete a project
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         description: Project ID
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/Project'
     */
    async deleteProject(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        try {
            await Project.findByIdAndDelete(id);
            res.status(204).send();
        }
        catch (error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to delete project ${details}`));
        }
    }
}