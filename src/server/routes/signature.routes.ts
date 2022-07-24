import { middleware } from '../middleware';
import { Router } from 'express';
import { signatureController } from '@root/server/controllers';

const signatureRoutes: Router = Router();
signatureRoutes.get('/', middleware.verifyAccessToken, signatureController.getSignature);
export default signatureRoutes;
