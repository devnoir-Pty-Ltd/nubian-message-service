import { middleware } from '../middleware';
import { Router } from 'express';
import { channelController } from '@root/server/controllers';

const channelRoutes: Router = Router();
channelRoutes.post('/', middleware.verifyAccessToken, channelController.createChannel);
channelRoutes.get('/', middleware.verifyAccessToken, channelController.getChannels);
channelRoutes.patch('/:id', middleware.verifyAccessToken, channelController.updateChannel);
channelRoutes.delete('/:id', middleware.verifyAccessToken, channelController.deleteChannel);

export default channelRoutes;
