'use strict';
module.exports = (sequelize, DataTypes) => {
    var google_user = sequelize.define('google_user', {

        user_id: {type: DataTypes.STRING(32), primaryKey: true, unique:true, allowNull:false},
        user_name: {type: DataTypes.STRING(32), allowNull:false},
        token: {type: DataTypes.STRING(64), allowNull:false},
        email: {type: DataTypes.STRING(32), unique:true, allowNull: false},
        create_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}

    }, {
        classMethods: {},
        tableName: 'google_user',
        freezeTableName: true,
        underscored: true,
        timestamps: false
    });
    google_user.associate = function(models) {
        // associations can be defined here

    };
    return google_user;
};