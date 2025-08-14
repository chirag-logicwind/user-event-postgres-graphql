import express from 'express';
import dotenv from 'dotenv';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import createApolloGraphQLServer from './graphql/index.js';
import { syncDb } from '../src/config/db.config.js';
import { getUserFromAuthHeader } from './utils/auth.js';

dotenv.config();

const PORT = process.env.APP_PORT || 4000;

async function init() {    
    await syncDb();
    
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/graphql", expressMiddleware(await createApolloGraphQLServer(), {
            context: async ({ req }) => ({
                user: getUserFromAuthHeader(req)
            }) 
        })
    );

    app.listen(PORT, () => {
        console.log(`Server Started on port: ${PORT}`);
    });    
}

init();