import { registerUser, loginUser, changePassword, updatePassword, resetPassword, requestPasswordReset } from '../services/user.service.js';
import { requireAuth } from '../utils/auth.js';
import User from '../models/user.model.js';

const resolvers = {
    Query: {
        me: async (_, __, ctx) => {
            if (!ctx.user) return null;
            return User.findByPk(ctx.user.id);
        }
    },
    Mutation: {
        register: async (_, args) => registerUser(args),
        login: async (_, args) => loginUser(args),

        changePassword: async (_, args, ctx) => {
            // console.log('resolver ',ctx);
            const authUser = requireAuth(ctx);
            return changePassword(authUser, args);
        },

        updatePassword: async (_, args, ctx) => {
            const authUser = requireAuth(ctx);
            return updatePassword(authUser, args);
        },

        requestPasswordReset: async (_, args) => requestPasswordReset(args),
        resetPassword: async (_, args) => resetPassword(args)
    }
};

export default resolvers;

