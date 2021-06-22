import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Profile from '../lib/models/Profile.js';

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

  test('gets a profile by id via GET', async () => {
    const profile = await Profile.insert({
      email: 'abc@abc.abc',
      accountId: 'abc123'
    });

    const res = await request(app)
      .get(`/api/v1/profiles/${profile.id}`)
      .send(profile);

    expect(res.body).toEqual(profile);
  });
});
