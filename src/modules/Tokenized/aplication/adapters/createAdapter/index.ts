import Redis from 'ioredis';
import { redisConfig } from '../../../infrastructure/data/redis';
import { Card } from '../../../domain/models/Card';
import { generateToken } from '../../../../../shared/helpers/generateToken';
import ICreateCard from '../../../domain/interfaces/ICreateCard';
import IToken from '../../../domain/interfaces/IToken';


export const createAdapter = async (body: ICreateCard, commerceToken: string): Promise<IToken> => {
    // Generar el token de la tarjeta   
    const token = generateToken();

    const { cardNumber, cvv, expirationMonth, expirationYear, email } = body;

    // Almacenar los datos en MongoDB
    await Card.create({ token, commerceToken, cardNumber, cvv, expirationMonth, expirationYear, email, createdAt: new Date() });

    // Almacenar los datos en Redis con una expiración de 15 minutos
    const redis = new Redis(redisConfig);
    await redis.set(token, JSON.stringify({ token, commerceToken, cardNumber, cvv, expirationMonth, expirationYear, email }));
    await redis.expire(token, 1200);

    redis.disconnect();

    const result = { token };

    return result;
}