import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';
import {handleValidationErrors} from '../utils/handleValidationErrors.js';
import { registerValidation, loginValidation } from '../validations/auth.js';

const router = new Router();

//Register
router.post('/register', registerValidation, register);

//Login
router.post('/login', loginValidation, login);

//Get me
router.get('/me', checkAuth, getMe);

export default router;