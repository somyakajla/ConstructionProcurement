import mongoose, { Schema, Document } from 'mongoose';

/**
 * @swagger
 *
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         example: 'me@domain.com'
 *       company_name:
 *         type: string
 *         example: 'John'
 *       role:
 *         type: string
 *         example: 'owner'
 *         enum: ['owner', 'contractor']
 */
export interface IUser extends Document {
    email: string;
    company_name: string;
    role: string;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    company_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['owner', 'contractor'],
        default: 'owner',
        required: true
    }
});

// Export the model and return your IUser interface
export const User = mongoose.model<IUser>('User', UserSchema, 'users');