import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('creates a profile via POST', async () => {
    const res = await request(app)
      .post('/api/v1/profiles').send({
        email: 'abc@abc.abc',
        accountId: 'abc123'
      });

    expect(res.body).toEqual({
      id: '1',
      email: 'abc@abc.abc',
      accountId: 'abc123'
    });
  });
});
