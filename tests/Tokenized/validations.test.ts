// import { test } from 'node:test';
// import assert from 'node:assert/strict';
import {
    getCardType,
    validateCVV,
    validateCardNumber,
    validateEmail,
    validateExpiration,
    validateToken,
    validateCommerceToken
} from '../../src/modules/Tokenized/adapters/validations';

import { generateToken } from '../../src/shared/helpers/generateToken';

test('Validate Card Number', () => {
    const cardNumberMock = '4111111111111111'
    const isValid = validateCardNumber(cardNumberMock)
    expect(isValid).toBe(true);
})

test('Validate Type Card', () => {
    const cardNumberMock = '4111111111111111'
    const isValid = getCardType(cardNumberMock)
    expect(isValid).toBe('visa' || 'mastercard' || 'amex');
})

test('Validate CVV', () => {
    const cvvMock = '1234'
    const cardTypeMock = 'amex'
    const isValid = validateCVV(cvvMock, cardTypeMock)
    expect(isValid).toBe(true);
})

test('Validate Email', () => {
    const emailMock = 'testing@gmail.com'
    const isValid = validateEmail(emailMock)
    expect(isValid).toBe(true);
})

test('Validate Expiration', () => {
    const monthMock = '12'
    const yearMock = '2023'
    const isValid = validateExpiration(monthMock, yearMock)
    expect(isValid).toBe(true);
})

test('Validate Helper Token', () => {

    const token = generateToken()
    const hasLowerCase = /[a-z]/.test(token);
    const hasUpperCase = /[A-Z]/.test(token);

    expect(token.length).toBe(16);
    expect(hasLowerCase).toBe(true);
    expect(hasUpperCase).toBe(true);
})

test('Validate CommerceToken', () => {
    const commerceTokenMock = 'pk_test_1234567891021234'
    const isValid = validateCommerceToken(commerceTokenMock)

    expect(isValid).toBe(true);
    expect(commerceTokenMock.length).toBe(24);
})

