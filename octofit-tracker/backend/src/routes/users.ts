import { Router } from 'express';

import { getEndpointUrl } from '../config/api.js';
import User from '../models/user.js';

const usersRouter = Router();

usersRouter.get('/', async (_request, response) => {
  const items = await User.find().sort({ name: 1 }).lean();

  response.json({
    resource: 'users',
    count: items.length,
    items,
    url: getEndpointUrl('/api/users/'),
  });
});

export default usersRouter;