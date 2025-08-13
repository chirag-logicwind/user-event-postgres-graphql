import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Connecting to a database
const sequelize = new Sequelize(
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

// test the connetion
sequelize.authenticate()
    .then(() => console.log("Database Connected."))
    .catch((err) => console.log('Database connection error', err));

export default sequelize;