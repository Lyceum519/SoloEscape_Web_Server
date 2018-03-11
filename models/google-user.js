'use strict';
module.exports = (sequelize, DataTypes) => {
    var google_user = sequelize.define('google_user', {

        id: {
            type: DataTypes.STRING(32),
            primaryKey: true,
            unique:true,
            allowNull:false
        },
        name: {
            type: DataTypes.STRING(32),
            allowNull:false
        },
        token: {
            type: DataTypes.STRING(64),
            allowNull:false
        },
        email: {
            type: DataTypes.STRING(32),
            unique:true,
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
