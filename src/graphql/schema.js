const typeDefs = `#graphql
    type User {
        name: String,
        email: String!
        password: String!        
    }
    
    type AuthPayload {
        token: String!
        user: User!
    }
    
    type Query {
        me: User
    }

    type Mutation {
        register(name: String, email: String!, password: String!): User!
        login(email: String!, password: String!): AuthPayload!
    }
`;

export default typeDefs;