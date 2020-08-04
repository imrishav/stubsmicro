import express from 'express';

const router = express.Router();

router.post('/api/users/sigin', (req, res) => {
  res.send('HI tere');
});

export { router as signinRouter };
