import { registerUser, loginUser } from '../services/user.service.js';

const resolvers = {
    Query: {

    },
    Mutation: {
        register: async (_, args) => registerUser(args),
        login: async (_, args) => loginUser(args)
    }
};

export default resolvers;