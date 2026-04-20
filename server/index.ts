import express from 'express';
import router from './router.ts';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(router);

app.listen(PORT, () => {
  console.log(`OAuth server running on http://localhost:${PORT}`);
});
