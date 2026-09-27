import { Router } from 'express';

import { getEndpointUrl } from '../config/api.js';
import Activity from '../models/activity.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response) => {
  const items = await Activity.find()
    .populate('user', 'name email')
    .populate('team', 'name city')
    .sort({ completedAt: -1 })
    .lean();

  response.json({
    resource: 'activities',
    count: items.length,
    items,
    url: getEndpointUrl('/api/activities/'),
  });
});

export default activitiesRouter;