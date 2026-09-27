import { Router } from 'express';

import { getApiBaseUrl, getEndpointUrl } from '../config/api.js';
import activitiesRouter from './activities.js';
import leaderboardRouter from './leaderboard.js';
import teamsRouter from './teams.js';
import usersRouter from './users.js';
import workoutsRouter from './workouts.js';

const apiRouter = Router();

apiRouter.get('/', (_request, response) => {
  response.json({
    baseUrl: getApiBaseUrl(),
    endpoints: {
      users: getEndpointUrl('/api/users/'),
      teams: getEndpointUrl('/api/teams/'),
      activities: getEndpointUrl('/api/activities/'),
      leaderboard: getEndpointUrl('/api/leaderboard/'),
      workouts: getEndpointUrl('/api/workouts/'),
    },
  });
});

apiRouter.use('/users', usersRouter);
apiRouter.use('/teams', teamsRouter);
apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/leaderboard', leaderboardRouter);
apiRouter.use('/workouts', workoutsRouter);

export default apiRouter;