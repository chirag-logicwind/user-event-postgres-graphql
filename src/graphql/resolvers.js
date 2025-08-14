import { registerUser, loginUser, changePassword, updatePassword, resetPassword, requestPasswordReset } from '../services/user.service.js';
import { createEvent, updateEvent, inviteUsers, getEventDetail, getMyEvents } from '../services/event.service.js';
import { requireAuth } from '../utils/auth.js';
import User from '../models/user.model.js';

const resolvers = {
    Query: {
        me: async (_, __, { user }) => {
            if (!user) return null;
            return User.findByPk(user.id);
        },
        myEvents: async (_, __, { user }) => {
            requireAuth(user);
            return getMyEvents(user);
        },
        eventDetail: async (_, { eventId }, { user }) => {
            requireAuth(user);
            return getEventDetail(eventId);
        }
    },
    Mutation: {
        register: async (_, args) => registerUser(args),
        login: async (_, args) => loginUser(args),

        changePassword: async (_, args, { user }) => {
            // console.log('resolver ',ctx);
            const authUser = requireAuth(user);
            return changePassword(authUser, args);
        },

        updatePassword: async (_, args, { user }) => {
            const authUser = requireAuth(user);
            return updatePassword(authUser, args);
        },

        requestPasswordReset: async (_, args) => requestPasswordReset(args),
        resetPassword: async (_, args) => resetPassword(args),

        createEvent: async (_, { data }, { user }) => {
            // console.log('user ',user);
            requireAuth(user);
            return await createEvent(user, data);
        },
        inviteUsers: async (_, { data }, { user }) => {
            requireAuth(user);
            return inviteUsers(data.eventId, data.emails);
        },
        updateEvent: async (_, { eventId, data }, { user }) => {
            requireAuth(user);
            return updateEvent(eventId, user, data);
        }
    }
};

export default resolvers;

