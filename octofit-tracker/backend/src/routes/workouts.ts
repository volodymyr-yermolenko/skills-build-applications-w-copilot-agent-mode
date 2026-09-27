import { Router } from 'express';

import { getEndpointUrl } from '../config/api.js';
import Workout from '../models/workout.js';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response) => {
  const items = await Workout.find().populate('user', 'name email').sort({ scheduledFor: 1 }).lean();

  response.json({
    resource: 'workouts',
    count: items.length,
    items,
    url: getEndpointUrl('/api/workouts/'),
  });
});

export default workoutsRouter;