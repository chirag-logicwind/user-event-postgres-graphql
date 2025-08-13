import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { signJwt } from '../utils/auth.js';

export const registerUser = async ({name, email, password}) => {     
    const email_exists = await User.findOne({ where: { email } });    

    if(email_exists) throw new Error('User already exists');
        
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    return user;
}

export const loginUser = async ({ email, password }) => {  

  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const ok = await bcrypt.compare(password, user.password);
  if (!ok || !user) throw new Error('Invalid credentials');

  const token = signJwt({ id: user.id, email: user.email });
  return { token, user };
};