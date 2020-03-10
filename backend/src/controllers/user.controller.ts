import * as express from 'express';
import { IController } from "./controller.interface";
import { HttpException } from '../errors/httpexception.error';
import { User, IUser } from "../models/user.model";
import * as environment from "../environment";
import jwt from "jsonwebtoken";

import sgMail from "@sendgrid/mail";
sgMail.setApiKey(environment.sendgridApiKey);

export class UserController implements IController {
    public router = express.Router();
    public route = "/user";

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.getUsers);
        this.router.post("/", this.createUser);
        this.router.post("/sendMagicLink", this.sendMagicLinkToUser);
        this.router.get("/login", this.authMagicLinkToUser);
        this.router.patch("/:id", this.updateUser);
        this.router.delete("/:id", this.deleteUser);
    }

    /**
     * @swagger
     *
     * /user:
     *   get:
     *     description: Get all current users
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/User'
     */
    async getUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const users = await User.find(req.query);
            res.json(users);
        }
        catch (error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to get users ${details}`));
        }
    }

    /**
     * @swagger
     *
     * /user:
     *   post:
     *     description: Create a new user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: user
     *         description: User object
     *         in: body
     *         required: true
     *         type: string
     *         schema:
     *             $ref: '#/definitions/User'
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/User'
     */
    async createUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user: IUser = req.body;
        try {
            const result: IUser[] = await User.create([user]);
            res.json(result);
        }
        catch (error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to create user ${details}`));
        }
    }

    /**
     * @swagger
     *
     * /user:
     *   post:
     *     description: Send a magic link to authenticate user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: email
     *         description: User email address
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/User'
     */
    async sendMagicLinkToUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userEmail: string = req.body.email;

        if (!userEmail)
            return next(new HttpException(500, `Failed to send magic link: missing email parameter`));

        let user: IUser;
        try {
            user = await User.findOne({email: userEmail}, {_id: 1});
        } catch(error) {
            return next(new HttpException(500, `Failed to send magic link: error searching for user`));
        }

        // generate magic token
        let magicToken = await new Promise((resolve, reject) => {
            return jwt.sign(
                { _id: user._id },
                environment.loginSecretKey,
                {
                    algorithm: 'HS256',
                    expiresIn: '7d'
                },
                (err, token) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(token)
                    }
                });
        });

        // generate email message
        const msg = {
            to: userEmail,
            from: 'saas@seattleu.edu',
            subject: 'Log into your account',
            // text: '',
            html: `<a href="${environment.baseUrl}:${environment.port}/user/login?t=${magicToken}">Click Here</a>`,
        };

        try {
            // send email request via SendGrid
            sgMail.send(msg);
            res.json();
        } catch(error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to create user ${details}`));
        }
    }


    /**
     * @swagger
     *
     * /user:
     *   post:
     *     description: Authenticate a magic link for a user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: email
     *         description: User email address
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/User'
     */
    async authMagicLinkToUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        const magicToken: string = req.query.t;
        console.log(magicToken)

        if (!magicToken)
            return next(new HttpException(500, `Failed to create user: missing magic token parameter`));

        // decode jwt token
        let payload: any;
        try {
            payload = jwt.verify(magicToken, environment.loginSecretKey);
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                return res.status(401).end()
            }
            return res.status(400).end()
        }

        let user: IUser;
        try {
            user = await User.findById(payload._id);

            if (user) {
                res.send(user);
            } else {
                res.status(500).end();
            }
        } catch(error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to create user ${details}`));
        }
    }

    /**
     * @swagger
     *
     * /user/{id}:
     *   patch:
     *     description: Update a user
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: user
     *         description: To be updated
     *         required: true
     *         schema:
     *           $ref: '#/definitions/User'
     *       - in: path
     *         name: id
     *         description: User ID
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/User'
     */
    async updateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        const newInfo: IUser = req.body;
        try {
            const oldUser = await User.findById(id);

            // remember to use $set!!
            await oldUser.updateOne({$set: newInfo});

            // findByIdAndUpdate will give you the old record
            const newUser = await User.findById(id);
            res.json(newUser);
        }
        catch (error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to update user ${details}`));
        }
    }


    /**
     * @swagger
     *
     * /user/{id}:
     *   delete:
     *     description: Delete a user
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         description: User ID
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/User'
     */
    async deleteUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        try {
            await User.findByIdAndDelete(id);
            res.status(204).send();
        }
        catch (error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to delete user ${details}`));
        }
    }
}