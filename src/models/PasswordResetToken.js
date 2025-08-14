import { DataTypes } from 'sequelize';

const ResetTokenModel = (sequelize) => {
  const PasswordResetToken = sequelize.define(
    'PasswordResetToken',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      token: { type: DataTypes.STRING, allowNull: false, unique: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      expiresAt: { type: DataTypes.DATE, allowNull: false },
      used: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    {
      tableName: 'password_reset_tokens',
      timestamps: true,
      indexes: [{ fields: ['token'] }, { fields: ['userId'] }]
    }
  );

  return PasswordResetToken;
};

export default ResetTokenModel;
