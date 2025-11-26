const request = require('supertest');
const app = require('../server');

describe('POST /api/contact', () => {
  it('should return 200 and success true for valid payload', async () => {
    const payload = {
      nom: 'Test User',
      email: 'test@example.com',
      typeDemande: 'information',
      message: 'Bonjour, je veux des infos sur le programme.',
    };

    const res = await request(app)
      .post('/api/contact')
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message');
  });

  it('should return 400 for invalid payload (short message)', async () => {
    const payload = {
      nom: 'T',
      email: 'invalid-email',
      typeDemande: 'info',
      message: 'short',
    };

    const res = await request(app)
      .post('/api/contact')
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('errors');
  });
});
