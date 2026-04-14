import express from 'express';
import { exchangeCodeForToken } from './getAccessToken.ts';
import { exchangeTokenForUser } from './getUser.ts';

const router = express.Router();

router.get('/api/auth/github/callback', async (req, res) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    const accessToken = await exchangeCodeForToken(code);
    const user = await exchangeTokenForUser(accessToken);

    return res.json({
      id: user.id,
      login: user.login,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to exchange token for user' });
  }
});

export default router;
