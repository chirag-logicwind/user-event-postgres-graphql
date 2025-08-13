import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

async function init() {    
    dotenv.config();
    
    const app = express();
    app.use(express.json());
    app.use(cors());

    const server = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }
        `,
        resolvers: {}
    });
    
    await server.start();

    app.use("/", expressMiddleware(server));    

    app.listen(process.env.APP_PORT, () => {
        console.log(`Server Started on port: ${process.env.APP_PORT}`);
    });    
}

init();