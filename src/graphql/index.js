import { ApolloServer } from '@apollo/server';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

async function createApolloGraphQLServer() {
    
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
        
    await server.start();

    return server;
}

export default createApolloGraphQLServer;
