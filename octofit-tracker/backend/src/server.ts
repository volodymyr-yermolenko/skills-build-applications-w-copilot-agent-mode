import cors from 'cors';
import express from 'express';

import { connectToDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const app = express();

// Allows the presentation tier (a different Codespaces port/origin) to call this API
app.use(cors());
app.use(express.json());

app.get('/', (_request, response) => {
  response.json({
    message: 'Octofit Tracker API',
    api: '/api',
    baseUrl: apiBaseUrl,
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