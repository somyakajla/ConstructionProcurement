import * as express from 'express';
import { IController } from "./controller.interface";
import { HttpException } from '../errors/httpexception.error';
import { Bid, IBid } from "../models/bid.model";

export class BidController implements IController {
    public router = express.Router();
    public route = "/bid";

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.getBids);
        this.router.post("/", this.createBid);
        this.router.patch("/:id", this.updateBid);
        this.router.delete("/:id", this.deleteBid);
    }

    /**
     * @swagger
     *
     * /bid:
     *   get:
     *     description: Get all bids
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/Bid'
     */
    async getBids(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const bids = await Bid.find(req.query);
            res.json(bids);
        }
        catch (error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to get bids ${details}`));
        }
    }

    /**
     * @swagger
     *
     * /bid:
     *   post:
     *     description: Create a new bid
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: bid
     *         description: Bid object
     *         in: body
     *         required: true
     *         type: string
     *         schema:
     *             $ref: '#/definitions/Bid'
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/Bid'
     */
    async createBid(req: express.Request, res: express.Response, next: express.NextFunction) {
        const bid: IBid = req.body;
        try {
            const result: IBid[] = await Bid.create([bid]);
            res.json(result);
        }
        catch (error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to create bid ${details}`));
        }
    }

    /**
     * @swagger
     *
     * /bid/{id}:
     *   patch:
     *     description: Update a bid
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: bid
     *         description: To be updated
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Bid'
     *       - in: path
     *         name: id
     *         description: Bid ID
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           schema:
     *             $ref: '#/definitions/Bid'
     */
    async updateBid(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        const newInfo: IBid = req.body;
        try {
            const oldBid = await Bid.findById(id);

            // remember to use $set!!
            await oldBid.updateOne({$set: newInfo});

            // findByIdAndUpdate will give you the old record
            const newBid = await Bid.findById(id);
            res.json(newBid);
        }
        catch (error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to update bid ${details}`));
        }
    }


    /**
     * @swagger
     *
     * /bid/{id}:
     *   delete:
     *     description: Delete a bid
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         description: Bid ID
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         response:
     *           type: array
     *           items:
     *              $ref: '#/definitions/Bid'
     */
    async deleteBid(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        try {
            await Bid.findByIdAndDelete(id);
            res.status(204).send();
        }
        catch (error) {
            const details = JSON.stringify(error);
            next(new HttpException(500, `Failed to delete bid ${details}`));
        }
    }
}