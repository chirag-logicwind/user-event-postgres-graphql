import { DataTypes } from 'sequelize';

const EventInviteModel = (sequelize) => {
  const EventInvite = sequelize.define('EventInvite', {
     email: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, { tableName: "EventInvite", timestamps: true });
  return EventInvite;
};

export default EventInviteModel;