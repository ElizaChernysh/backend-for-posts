import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';
import {registerValidation, loginValidation} from '../validations/auth.js';
import { handleValidationErrors } from '../utils/handleValidationErrors.js';

const router = new Router();

//Register
router.post('/register', registerValidation, handleValidationErrors, register);

//Login
router.post('/login', registerValidation, handleValidationErrors, login);

//Get me
router.get('/me', checkAuth, getMe);

export default router;