import { User, PasswordResetToken, Event } from '../config/db.config.js';
import bcrypt from 'bcrypt';
import { signJwt, generateResetToken, resetExpiry } from '../utils/auth.js';
import { Op } from 'sequelize';
import {
  validateRegister,
  validateLogin,
  validateChangePassword,
  validateUpdatePassword,
  validateRequestReset,
  validateResetPassword
} from '../utils/validators.js';

export const registerUser = async ({name, email, password}) => {     
    await validateRegister({ name, email, password });

    const email_exists = await User.findOne({ where: { email } });    

    if(email_exists) throw new Error('User already exists');
        
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    return user;
}

export const loginUser = async ({ email, password }) => {  
  await validateLogin({ email, password });

  const user = await User.findOne({ where: { email }, include: { model: Event, as: 'events' } });
  if (!user) throw new Error('Invalid credentials');

  const ok = await bcrypt.compare(password, user.password);
  if (!ok || !user) throw new Error('Invalid credentials');

  const token = signJwt({ id: user.id, email: user.email });
  return { token, user };
};

export const changePassword = async (authUser, { oldPassword, newPassword }) => {
  await validateChangePassword({ oldPassword, newPassword });
  const user = await User.findByPk(authUser.id);
  if (!user) throw new Error('User not found');

  const passMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passMatch) throw new Error('Old password is incorrect');

  user.password = await bcrypt.hash(newPassword, 10);
  user.lastPasswordChangeAt = new Date();
  await user.save();

  return true;
};

export const updatePassword = async (authUser, { newPassword }) => {
  await validateUpdatePassword({ newPassword });
  const user = await User.findByPk(authUser.id);
  if (!user) throw new Error('User not found');

  user.password = await bcrypt.hash(newPassword, 10);
  user.lastPasswordChangeAt = new Date();
  await user.save();

  return true;
};

export const requestPasswordReset = async ({ email }) => {
  await validateRequestReset({ email });

  const user = await User.findOne({ where: { email } });
  if (!user) {
    // To avoid user enumeration, respond success anyway
    return { status: true };
  }

  // Invalidate any previous unused tokens (optional hygiene)
  await PasswordResetToken.update(
    { used: true },
    { where: { userId: user.id, used: false, expiresAt: { [Op.gt]: new Date() } } }
  );

  const token = generateResetToken();
  await PasswordResetToken.create({
    token,
    userId: user.id,
    expiresAt: resetExpiry()
  });

  // TODO: send token via email. For demo we return it.
  return { status: true, token };
};

export const resetPassword = async ({ token, newPassword }) => {
  await validateResetPassword({ token, newPassword });

  const record = await PasswordResetToken.findOne({
    where: { token, used: false, expiresAt: { [Op.gt]: new Date() } }
  });

  if (!record) throw new Error('Invalid or expired token');

  const user = await User.findByPk(record.userId);
  if (!user) throw new Error('User not found');

  user.password = await bcrypt.hash(newPassword, 10);
  user.lastPasswordChangeAt = new Date();
  await user.save();

  record.used = true;
  await record.save();

  return true; 
};
