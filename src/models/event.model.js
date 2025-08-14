import { DataTypes } from 'sequelize';

const EventModel = (sequelize) => {
  const Event = sequelize.define('Event', {
    title: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
  }, { tableName: "Events", timestamps: true });
  return Event;
};

export default EventModel;