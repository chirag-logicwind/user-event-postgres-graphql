import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createApolloGraphQLServer from './graphql/index.js';
import sequelize from '../src/config/db.config.js';

async function init() {    
    dotenv.config();
    
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/", expressMiddleware(await createApolloGraphQLServer() ));

    await sequelize.sync();

    app.listen(process.env.APP_PORT, () => {
        console.log(`Server Started on port: ${process.env.APP_PORT}`);
    });    
}

init();