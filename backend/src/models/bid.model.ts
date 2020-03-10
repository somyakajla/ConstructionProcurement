import mongoose, { Schema, Document } from 'mongoose';

/**
 * @swagger
 *
 * definitions:
 *   Bid:
 *     type: object
 *     properties:
 *       project_id:
 *         type: string
 *         example: '5e4cccc8007d3554fd089599'
 *       duration:
 *         type: number
 *         example: 100
 *       budget:
 *         type: number
 *         example: 1000000
 */
export interface IBid extends Document {
    email: string;
    company_name: string;
    role: string;
}

const BidSchema: Schema = new Schema({
    project_id: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    budget: {
        type: Number,
        required: true
    }
});

// Export the model and return your IBid interface
export const Bid = mongoose.model<IBid>('Bid', BidSchema, 'bids');