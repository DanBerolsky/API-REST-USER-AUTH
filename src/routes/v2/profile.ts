import express from 'express';
import profileController from './controllers/profileController';
import authenticateToken from '../../middlewares/authenticateToken';

const router = express.Router();


router.get('/',authenticateToken, profileController)


export default router;