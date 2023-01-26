import { body } from 'express-validator';

export const registerValidation = [
  body('username', "Вкажіть ім'я").isLength({min: 3}),
  body('password', "Пароль має містити мінімум 4 символів").isLength({ min: 4})
];

export const loginValidation = [
  body('username', "Вкажіть правильне ім'я").isLength({min: 3}),
  body('password', "Пароль має містити мінімум 4 символів").isLength({ min: 4})
];