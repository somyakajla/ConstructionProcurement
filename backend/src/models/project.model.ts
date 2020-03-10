import mongoose, { Schema, Document } from 'mongoose';

/**
 * @swagger
 *
 * definitions:
 *   Project:
 *     type: object
 *     properties:
 *       owner_id:
 *         type: string
 *         example: '5e4cccc8007d3554fd089599'
 *       name:
 *         type: string
 *         example: 'Golden Gate Bridge Renovation'
 *       status:
 *         type: string
 *         example: 'open'
 *         enum: ['open', 'closed']
 *       duration:
 *         type: number
 *         example: 100
 *       budget:
 *         type: number
 *         example: 1000000
 *       description:
 *         type: string
 *         example: 'Bridge must be retrofitted to withstand an 8.0 earthquake'
 */
export interface IProject extends Document {
    email: string;
    company_name: string;
    role: string;
}

const ProjectSchema: Schema = new Schema({
    owner_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: '',
        required: true
    }
});

// Export the model and return your IProject interface
export const Project = mongoose.model<IProject>('Project', ProjectSchema, 'projects');