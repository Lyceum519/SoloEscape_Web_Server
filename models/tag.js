'use strict';
module.exports = (sequelize, DataTypes) => {
  var tag = sequelize.define('tag', {}, {});
  tag.associate = function(models) {
    // associations can be defined here
  };
  return tag;
};