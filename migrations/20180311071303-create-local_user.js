'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('local_users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING(32),
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
    return queryInterface.dropTable('local_users');
  }
};
