import { Router } from 'express';
import { messageController } from '@root/server/controllers';

const msgRouter: Router = Router();
msgRouter.post('/', messageController.messageSend);
msgRouter.get('/', messageController.getMessages);
msgRouter.get('/:id', messageController.getMessage);
msgRouter.patch('/:id', messageController.updateMessage);
msgRouter.delete('/:id', messageController.deleteMessage);

export default msgRouter;
