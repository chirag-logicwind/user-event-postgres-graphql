import { body, validationResult } from 'express-validator';

const runValidators = async (data, rules) => {
  // Run validators against a fake req-like object
  for (const rule of rules) {
    // rule.run expects an object with { body }
    await rule.run({ body: data });
  }
  const result = validationResult({ body: data });
  if (!result.isEmpty()) {
    const formatted = result.array().map(e => `${e.path}: ${e.msg}`).join(', ');
    throw new Error(`Validation failed: ${formatted}`);
  }
};

export const validateRegister = async (data) =>
  runValidators(data, [
    body('name').trim().notEmpty().withMessage('name is required'),
    body('email').isEmail().withMessage('valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('password min length 6')
  ]);

export const validateLogin = async (data) =>
  runValidators(data, [
    body('email').isEmail().withMessage('valid email is required'),
    body('password').notEmpty().withMessage('password is required')
  ]);

export const validateChangePassword = async (data) =>
  runValidators(data, [
    body('oldPassword').isLength({ min: 6 }).withMessage('oldPassword min length 6'),
    body('newPassword').isLength({ min: 6 }).withMessage('newPassword min length 6')
  ]);

export const validateUpdatePassword = async (data) =>
  runValidators(data, [
    body('newPassword').isLength({ min: 6 }).withMessage('newPassword min length 6')
  ]);

export const validateRequestReset = async (data) =>
  runValidators(data, [
    body('email').isEmail().withMessage('valid email is required')
  ]);

export const validateResetPassword = async (data) =>
  runValidators(data, [
    body('token').notEmpty().withMessage('token is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('newPassword min length 6')
  ]);
