import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,        
    },
    email: {
        type: DataTypes.STRING,
        unique: true,        
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resetToken: {
        type: DataTypes.STRING
    }
}, { tableName: "Users", timestamps: true });

export default User;