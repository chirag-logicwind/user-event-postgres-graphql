import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import UserModel from '../models/user.model.js';
import EventModel from '../models/event.model.js';
import EventInviteModel from '../models/eventInvite.model.js';
import ResetTokenModel from '../models/PasswordResetToken.js';

dotenv.config();

// Connecting to a database
export const sequelize = new Sequelize(
    process.env.DB_NAME, // db name
    process.env.DB_USER, // db user
    process.env.DB_PASSWORD, // db pass
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false
    }
);


export const User = UserModel(sequelize);
export const PasswordResetToken = ResetTokenModel(sequelize);

export const Event = EventModel(sequelize);
export const EventInvite = EventInviteModel(sequelize);

// association
// Password Reset Token relation
PasswordResetToken.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(PasswordResetToken, { foreignKey: 'userId' });

// User ↔ Event (Creator)
User.hasMany(Event, { as: 'events',  foreignKey: 'creatorId' });
Event.belongsTo(User, { as: 'creator', foreignKey:'creatorId' });

// Event ↔ EventInvite
Event.hasMany(EventInvite, { as: 'invites', foreignKey: 'EventId' });
EventInvite.belongsTo(Event, { as: 'event', foreignKey: 'EventId' });

// User ↔ EventInvite (who is invited)
User.hasMany(EventInvite, { as: 'sentInvites', foreignKey: 'userId' });
EventInvite.belongsTo(User, { as: 'invitee', foreignKey: 'userId' });

/*  
Event.creator → the user who created the event
Event.invites → list of invites for this event
EventInvite.invitee → the user who got invited
*/
// Sync helper (dev only)
export const syncDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync(); // use { alter: true } in dev if needed
};