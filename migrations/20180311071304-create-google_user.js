'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('google_users', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                unique: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(32),
                allowNull:false
            },
            token: {
                type: Sequelize.STRING(64),
                allowNull:false
            },
            email: {
                type: Sequelize.STRING(32),
                unique:true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(32),
                allowNull:false
            },
            createdAt: {
                allowNull: false,
                defaultValue: Sequelize.NOW,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
                }
            }
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('google_users');
    }
};
