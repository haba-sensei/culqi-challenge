import { Schema } from 'mongoose';
import ICard from '../interfaces/ICard';

export const cardSchema = new Schema<ICard>({
    token: { type: String, required: true },
    commerceToken: { type: String, required: true },
    cardNumber: { type: String, required: true },
    cvv: { type: String, required: true },
    expirationMonth: { type: String, required: true },
    expirationYear: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '15m' }
});