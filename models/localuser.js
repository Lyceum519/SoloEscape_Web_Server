'use strict';
module.exports = (sequelize, DataTypes) => {
  var local_user = sequelize.define('local_user', {

    user_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING(32), allowNull: false},
    password: {type: DataTypes.STRING(32), allowNull:false},
    create_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}

  }, {
      classMethods: {},
      tableName: 'local_user',
      freezeTableName: true,
      underscored: true,
      timestamps: false
  });
  local_user.associate = function(models) {
    // associations can be defined here

  };
  return local_user;
};