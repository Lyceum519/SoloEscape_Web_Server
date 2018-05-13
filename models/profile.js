'use strict';
module.exports = (sequelize, DataTypes) => {
  var profile = sequelize.define('Profile', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nickname: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
    picture: {
        type: DataTypes.BLOB,
        allowNull:true,
    },

  }, {
      classMethods: {},
      tableName: 'profile',
      freezeTableName: true,
      underscored: true,
      timestamps: false
  });
  profile.associate = function(models) {
    // associations can be defined here
  };
  return profile;
};