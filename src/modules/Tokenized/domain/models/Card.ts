import { model } from 'mongoose';
import ICard from '../interfaces/ICard';
import { cardSchema } from '../schema/Card';

export const Card = model<ICard>('Card', cardSchema);