import { Request, Response, NextFunction } from 'express';
import { createUseCase } from '../../../aplication/usecases/createUseCase';


export const postTokenizedController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commerceToken = req.headers.authorization;
        // Generar el token de la tarjeta
        const token = await createUseCase(req.body, commerceToken);

        res.json(token);
    } catch (error) {
        next(error);
    }
};