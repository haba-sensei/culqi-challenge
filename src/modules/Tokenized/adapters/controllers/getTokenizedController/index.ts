import { Request, Response, NextFunction } from 'express';
import { getUseCase } from '../../../aplication/usecases/getUseCase';
import { errorTokenNotExist, error_400 } from '../../../../../global/messages';

export const getTokenizedController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params.token;

        // Lógica para obtener los datos de la tarjeta utilizando el token
        const cardData = await getUseCase(token);

        // Verificar si se encontraron los datos de la tarjeta
        if (cardData) {
            // Retornar solo los datos necesarios de la tarjeta (sin CVV)
            const { token, commerceToken, cardNumber, expirationMonth, expirationYear, email } = cardData;
            const cardInfo = { token, commerceToken, cardNumber, expirationMonth, expirationYear, email };
            res.json(cardInfo);
        } else {
            // Retornar una respuesta coherente si el elemento no está presente
            res.status(error_400).json({ error: errorTokenNotExist });
        }
    } catch (error) {
        next(error);
    }
};