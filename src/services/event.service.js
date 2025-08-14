import { Event, EventInvite, User } from '../config/db.config.js';
import { Op } from 'sequelize';

export const createEvent = async (user, data) => {
  const event = await Event.create({ ...data, creatorId: user.id  });
  
  // Reload with creator relation
  const eventWithCreator = await Event.findByPk(event.id, {
    include: [{ model: User, as: 'creator' }]
  });

  return eventWithCreator;
};

export const inviteUsers = async (eventId, emails) => {
  const invites = emails.map(email => ({ EventId: eventId, email }));
  const event = await EventInvite.bulkCreate(invites);  
  const res = await EventInvite.findAll({
    where: { EventId: eventId },
  }, { logging: true } );  
  return res;
};

export const getMyEvents = async (user) => {
  return Event.findAll({
    where: {
      [Op.or]: [
        { creatorId: user.id },
        { '$invites.email$': user.email }
      ]
    },
    include: [
      { model: User, as: 'creator' },
      { model: EventInvite, as: 'invites' }
    ],
    distinct: true
  });
};

export const getEventDetail = async (eventId) => {
  return Event.findByPk(eventId, {
    include: [
      { model: User, as: 'creator' },
      { model: EventInvite, as: 'invitees', 
        include: [
        { model: Event, as: 'event'}
      ]},      
    ]
  });
};

export const updateEvent = async (eventId, user, data) => {
  const event = await Event.findOne({ where: { id: eventId, creatorId: user.id } });
  if (!event) throw new Error('Event not found or unauthorized');
  if(event.creatorId !== user.id) throw new Error('Not authorized');

  await event.update(data);

  const updatdEvent = await Event.findByPk(event.id, {
    include: [{ model: User, as: 'creator' }]
  });

  return updatdEvent;
};
