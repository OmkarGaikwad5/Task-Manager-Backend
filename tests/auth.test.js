import request from 'supertest';
import app from '../src/server.js';

describe('Auth routes smoke', () => {
  it('should respond root ok', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
