import { errorGetCardValues } from "../../../../../global/messages";
import ICard from "../../../domain/interfaces/ICard";
import { Card } from '../../../domain/models/Card';

export const getAdapter = async (token: string): Promise<ICard> => {
    try {
        const cardData = await Card.findOne({ token }).exec();

        if (!cardData) {
            throw new Error(errorGetCardValues);
        }

        return cardData;
    } catch (error) {
        throw new Error(errorGetCardValues);
    }
}