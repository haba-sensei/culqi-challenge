import { check, body, param } from 'express-validator';
import {
    errorCardInvalid,
    errorComerceTokenInvalid,
    errorComerceTokenMissin,
    errorCvvInvalid,
    errorEmailInvalid,
    errorExpirationDateInvalid,
    errorTokenExpireInvalid
} from '../../../../../global/messages';
import { getCardType, validateCVV, validateCardNumber, validateCommerceToken, validateEmail, validateExpiration, validateToken } from '../index';

export const authorizationChain = check('authorization').custom((commerceToken) => {
    const isValidCommerceToken = validateCommerceToken(commerceToken);
    if (!isValidCommerceToken) {
        throw new Error(errorTokenExpireInvalid);
    }
    return true;
});


export const tokenChain = param('token').custom(async (token) => {
    const isValidToken = await validateToken(token);
    if (!isValidToken) {
        throw new Error(errorTokenExpireInvalid);
    }
    return true;
});


export const cardNumberChain = body('cardNumber').custom((cardNumber) => {
    const isValidCardNumber = validateCardNumber(cardNumber);
    if (!isValidCardNumber) {
        throw new Error(errorCardInvalid);
    }
    return true;
});


export const cvvChain = body('cvv').custom((val, { req }) => {
    const cardType = getCardType(req.body.cardNumber);
    const isValidCVV = validateCVV(val, cardType);
    if (!isValidCVV) {
        throw new Error(errorCvvInvalid);
    }
    return true;
});


export const expirationDateChain = body('expirationMonth', 'expirationYear').custom((val, { req }) => {
    const isValidExpiration = validateExpiration(req.body.expirationMonth, req.body.expirationYear);
    if (!isValidExpiration) {
        throw new Error(errorExpirationDateInvalid);
    }
    return true;
});

export const emailChain = body('email').custom((val) => {
    const isValidEmail = validateEmail(val);
    if (!isValidEmail) {
        throw new Error(errorEmailInvalid);
    }
    return true;
});







