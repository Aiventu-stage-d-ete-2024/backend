import express from 'express';
import { signUp, 
         signIn, 
         forgotPassword, 
         resetPassword} from '../controller/userController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);

export default router;
