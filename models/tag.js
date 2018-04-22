'use strict';
module.exports = (sequelize, DataTypes) => {
  var tag = sequelize.define('Tag', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    kinds: {
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
      tableName: 'tag',
      freezeTableName: true,
      underscored: true,
      timestamps: false
  });
  tag.associate = function(models) {
    // associations can be defined here
  };
  return tag;
};