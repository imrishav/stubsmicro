import request from 'supertest';
import { app } from '../../App';

it('returns 201 on signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns 400 with invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test',
      password: 'password',
    })
    .expect(400);
});

it('returns 400 with invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com',
      password: '1',
    })
    .expect(400);
});

it('returns 400 with invalid email & password', async () => {
  return request(app).post('/api/users/signup').send({}).expect(400);
});

it('disallow duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after succesfull signup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();
});
