import request from 'supertest';
import { app } from '../../App';

it('user current details', async () => {
  const cookie = await global.signin();

  const authRes = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(authRes.body.currentUser.email).toEqual('test@test.com');
});

it('not aut user', async () => {
  const authRes = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(authRes.body.currentUser).toEqual(null);
});
