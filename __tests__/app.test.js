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
      .get(`/api/v1/profiles/${profile.id}`);

    expect(res.body).toEqual(profile);
  });

  test('gets all profiles via GET', async () => {
    const profile1 = await Profile.insert({
      email: 'abc@abc.abc',
      accountId: 'abc123'
    });

    const profile2 = await Profile.insert({
      email: '123@123.123',
      accountId: '123abc'
    });

    const res = await request(app)
      .get('/api/v1/profiles/');

    expect(res.body).toEqual([profile1, profile2]);
  });

  test('update a profiles by id via PUT', async () => {
    const profile = await Profile.insert({
      email: 'abc@abc.abc',
      accountId: 'abc123'
    });

    profile.email = '123@123.123';

    const res = await request(app)
      .put(`/api/v1/profiles/${profile.id}`)
      .send(profile);

    expect(res.body).toEqual(profile);
  });
});
