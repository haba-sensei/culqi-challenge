let JsonResult: any;

test('Validate Create Card Token', async () => {
    const body = {
        cardNumber: '4111111111111111',
        cvv: '123',
        expirationMonth: '12',
        expirationYear: '2023',
        email: 'test@gmail.com',
    };
    const commerceToken = 'pk_test_1234567891021234';

    const response = await fetch('http://localhost:5000/api/v1/card/tokenize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: commerceToken,
        },
        body: JSON.stringify(body),
    });

    JsonResult = await response.json();

    expect(response.status).toBe(200);
    expect(JsonResult.token.length).toBe(16);
});


test('Validate Token after create Card', async () => {
    expect(JsonResult.token.length).toBe(16);

    const commerceToken = 'pk_test_1234567891021234';

    const response = await fetch(`http://localhost:5000/api/v1/card/${JsonResult.token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: commerceToken,
        },
    });

    const JsonCardTokenized = await response.json();

    expect(response.status).toBe(200);
    expect(JsonCardTokenized.token.length).toBe(16);
});


