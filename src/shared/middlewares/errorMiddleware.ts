import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { error_400 } from '../../global/messages';

export const errorMiddleware: ErrorRequestHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(error_400).json({ error: error.message });
};