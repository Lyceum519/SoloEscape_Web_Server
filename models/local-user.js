'use strict';
module.exports = (sequelize, DataTypes) => {
  var local_user = sequelize.define('local_user', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(32),
        allowNull:false
    },
    createdAt: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }

  }, {
      classMethods: {},
      tableName: 'local_user',
      freezeTableName: true,
      underscored: true,
      timestamps: true
  });
  local_user.associate = function(models) {
    // associations can be defined here

  };
  return local_user;
};