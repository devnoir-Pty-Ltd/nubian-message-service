import { verifyAccessToken } from './../middleware/index';
import { Router } from 'express';
import { messageController } from '@root/server/controllers';

const msgRouter: Router = Router();
msgRouter.post('/', verifyAccessToken, messageController.sendMessage);
msgRouter.get('/', verifyAccessToken, messageController.getMessages);
msgRouter.get('/:id', verifyAccessToken, messageController.getMessage);
msgRouter.patch('/:id', verifyAccessToken, messageController.updateMessage);
msgRouter.delete('/:id', verifyAccessToken, messageController.deleteMessage);

export default msgRouter;
