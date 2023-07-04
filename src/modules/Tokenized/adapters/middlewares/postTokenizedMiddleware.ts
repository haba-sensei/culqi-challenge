import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { error_400 } from '../../../../global/messages';
import { authorizationChain, cardNumberChain, cvvChain, expirationDateChain, emailChain } from '../validations/chains';


export const postTokenizedMiddleware = [
    authorizationChain,
    cardNumberChain,
    cvvChain,
    expirationDateChain,
    emailChain,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(error_400).json({ error: errors.array()[0].msg });
            return;
        }
        next();
    },
]; 