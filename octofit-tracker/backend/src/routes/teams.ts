import { Router } from 'express';

import { getEndpointUrl } from '../config/api.js';
import Team from '../models/team.js';

const teamsRouter = Router();

teamsRouter.get('/', async (_request, response) => {
  const items = await Team.find().populate('members', 'name email fitnessLevel').sort({ name: 1 }).lean();

  response.json({
    resource: 'teams',
    count: items.length,
    items,
    url: getEndpointUrl('/api/teams/'),
  });
});

export default teamsRouter;