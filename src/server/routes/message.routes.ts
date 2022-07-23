import { middleware } from '../middleware';
import { Router } from 'express';
import { messageController } from '@root/server/controllers';

const msgRouter: Router = Router();
msgRouter.post('/', middleware.verifyAccessToken, messageController.sendMessage);
msgRouter.get('/', middleware.verifyAccessToken, messageController.getMessages);
msgRouter.get('/:id', middleware.verifyAccessToken, messageController.getMessage);
msgRouter.patch('/:id', middleware.verifyAccessToken, messageController.updateMessage);
msgRouter.delete('/:id', middleware.verifyAccessToken, messageController.deleteMessage);

export default msgRouter;
