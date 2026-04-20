import express from 'express';
import router from './router.ts';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, '../dist');
const clientOrigin = (process.env.CLIENT_URL || 'https://graphqlclient-production.up.railway.app').replace(/\/$/, '');

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use('/api', (_, res) => {
  res.status(404).json({ error: 'API route not found' });
});

app.use(express.static(distPath));

app.get('/{*splat}', (_, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`OAuth server running on port ${PORT}`);
});
