import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import UserModel from '../models/user.model.js';
import ResetTokenModel from '../models/PasswordResetToken.js';

dotenv.config();

// Connecting to a database
export const sequelize = new Sequelize(
    process.env.DB_NAME, // db name
    process.env.DB_USER, // db user
    process.env.DB_PASSWORD, // db pass
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false
    }
);

export const User = UserModel(sequelize);
export const PasswordResetToken = ResetTokenModel(sequelize);

// Associations
PasswordResetToken.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(PasswordResetToken, { foreignKey: 'userId' });

// Sync helper (dev only)
export const syncDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync(); // use { alter: true } in dev if needed
};