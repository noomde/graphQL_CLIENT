import express from 'express';
import router from './router.ts';

const app = express();
const PORT = 3000;

app.use(router);

app.listen(PORT, () => {
  console.log(`OAuth server running on http://localhost:${PORT}`);
});