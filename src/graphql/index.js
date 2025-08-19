import { ApolloServer } from '@apollo/server';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

async function createApolloGraphQLServer() {
    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: process.env.NODE_ENV !== 'production', // only enable in dev
    });
        
    await server.start();

    return server;
}

export default createApolloGraphQLServer;
