import express from 'express';

import { getServerPort } from './config/api.js';
import { connectToDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = getServerPort();

app.use(express.json());

app.get('/', (_request, response) => {
  response.json({
    message: 'Octofit Tracker API',
    api: '/api',
  });
});

app.use('/api', apiRouter);

async function startServer() {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Octofit Tracker API listening on port ${port}`);
  });
}

startServer();