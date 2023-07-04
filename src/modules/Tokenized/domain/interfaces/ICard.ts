import { Document } from 'mongoose';

export default interface ICard extends Document {
    token: string;
    commerceToken: string;
    cardNumber: string;
    cvv: string;
    expirationMonth: string;
    expirationYear: string;
    email: string;
    createdAt: Date;
}
