import { DataTypes } from 'sequelize';

const UserModel = (sequelize) => {
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
        lastPasswordChangeAt: { 
            type: DataTypes.DATE, 
            allowNull: true 
        }
    }, { tableName: "Users", timestamps: true });
    return User;
};

export default UserModel;