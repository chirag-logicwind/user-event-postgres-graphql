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

    type RequestResetResponse {
        status: Boolean!
        token: String # returned only for demo; in prod you email it instead
    }
    
    type Query {
        me: User
    }

    type Mutation {
        register(name: String, email: String!, password: String!): User!
        login(email: String!, password: String!): AuthPayload!

        changePassword(oldPassword: String!, newPassword: String!): Boolean!
        updatePassword(newPassword: String!): Boolean!

        requestPasswordReset(email: String!): RequestResetResponse!
        resetPassword(token: String!, newPassword: String!): Boolean!
    }
`;

export default typeDefs;