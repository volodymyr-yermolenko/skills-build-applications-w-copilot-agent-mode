import { Router } from 'express';

import { getEndpointUrl } from '../config/api.js';
import Leaderboard from '../models/leaderboard.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response) => {
  const entries = await Leaderboard.find()
    .populate('user', 'name fitnessLevel')
    .populate('team', 'name')
    .sort({ rank: 1 })
    .lean();

  response.json({
    resource: 'leaderboard',
    count: entries.length,
    entries,
    url: getEndpointUrl('/api/leaderboard/'),
  });
});

export default leaderboardRouter;