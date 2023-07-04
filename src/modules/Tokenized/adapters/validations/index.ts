import Redis from 'ioredis';
import { Card } from '../../domain/models/Card';
import { redisOptions } from '../../../../global/data';


export const validateCommerceToken = (commerceToken: string): boolean => {
    if (!commerceToken) {
        return false;
    } else if (!commerceToken.startsWith('pk_test_') || commerceToken.length !== 24) {
        return false;
    }
    return true;
}

// Validar el número de tarjeta utilizando el algoritmo de Luhn
export const validateCardNumber = (cardNumber: string): boolean => {
    const sanitizedCardNumber = cardNumber.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    if (!/^\d{13,16}$/.test(sanitizedCardNumber)) {
        return false;
    }

    let sum = 0;
    let shouldDouble = false;
    for (let i = sanitizedCardNumber.length - 1; i >= 0; i--) {
        let digit = Number(sanitizedCardNumber[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
};

// Obtener el tipo de tarjeta basado en el número de tarjeta
export const getCardType = (cardNumber: string): string => {
    const sanitizedCardNumber = cardNumber.replace(/\D/g, ''); // Eliminar caracteres no numéricos

    if (/^4\d{12}(\d{3})?$/.test(sanitizedCardNumber)) {
        return 'visa';
    } else if (/^5[1-5]\d{14}$/.test(sanitizedCardNumber)) {
        return 'mastercard';
    } else if (/^3[47]\d{13}$/.test(sanitizedCardNumber)) {
        return 'amex';
    } else {
        return 'unknown';
    }
}

// Validar el CVV según el tipo de tarjeta
export const validateCVV = (cvv: string, cardType: string): boolean => {
    const sanitizedCVV = cvv.replace(/\D/g, ''); // Eliminar caracteres no numéricos

    if (cardType === 'visa' || cardType === 'mastercard') {
        return /^\d{3}$/.test(sanitizedCVV);
    } else if (cardType === 'amex') {
        return /^\d{4}$/.test(sanitizedCVV);
    } else {
        return false;
    }
}

// Validar la fecha de expiración de la tarjeta
export const validateExpiration = (expirationMonth: string, expirationYear: string): boolean => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const sanitizedExpirationMonth = expirationMonth.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    const sanitizedExpirationYear = expirationYear.replace(/\D/g, ''); // Eliminar caracteres no numéricos

    const month = parseInt(sanitizedExpirationMonth, 10);
    const year = parseInt(sanitizedExpirationYear, 10);

    if (isNaN(month) || isNaN(year)) {
        return false;
    }

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false;
    }

    if (month < 1 || month > 12) {
        return false;
    }

    // Validar el tamaño máximo de los valores de mes y año
    if (sanitizedExpirationMonth.length > 2 || sanitizedExpirationYear.length !== 4) {
        return false;
    }

    // Calcular el año máximo permitido
    const maxAllowedYear = currentYear + 5;

    if (year > maxAllowedYear) {
        return false;
    }

    return true;
};

// Validar el formato del email y los dominios permitidos
export const validateEmail = (email: string): boolean => {
    const validDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
    const sanitizedEmail = email.trim().toLowerCase();

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(sanitizedEmail)) {
        return false;
    }

    const domain = sanitizedEmail.substring(sanitizedEmail.lastIndexOf('@') + 1);
    return validDomains.includes(domain);
}

export const validateTokenInMongoDB = async (token: string): Promise<boolean> => {
    try {
        const cardData = await Card.findOne({ token }).exec();

        if (!cardData) {
            return false; // El token no existe en MongoDB
        }

        // Verificar si el token ha expirado
        const expirationTime = 15 * 60 * 1000; // 15 minutos en milisegundos
        // const expirationTime = 30 * 1000; // 30 segundos en milisegundos
        const currentTime = new Date().getTime();
        const tokenCreatedAt = cardData.createdAt.getTime();
        const elapsedTime = currentTime - tokenCreatedAt;

        if (elapsedTime > expirationTime) {
            throw new Error('El token ha expirado.'); // Lanzar una excepción si el token ha expirado
        }

        return true;
    } catch (error) {
        throw new Error('Error al validar el token en MongoDB.');
    }
};


export const validateTokenInRedis = async (token: string): Promise<boolean> => {
    try {
        const redis = new Redis(redisOptions);
        const data = await redis.get(token);

        if (!data) {
            return false; // El token no existe en Redis
        }

        // Verificar si el token ha expirado
        const ttl = await redis.ttl(token);
        if (ttl < 0) {
            throw new Error('El token ha expirado.'); // Lanzar una excepción si el token ha expirado
        }

        redis.disconnect();
        return true;
    } catch (error) {
        throw new Error('Error al validar el token en Redis.');
    }
};

export const validateToken = async (token: string): Promise<boolean> => {
    try {
        const isValidMongoDB = await validateTokenInMongoDB(token);
        const isValidRedis = await validateTokenInRedis(token);

        if (!isValidMongoDB && isValidRedis) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};

