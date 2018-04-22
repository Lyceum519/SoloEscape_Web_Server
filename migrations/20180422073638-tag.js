'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tag', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(32),
            allowNull: false
        },
        kinds: {
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
    return queryInterface.dropTable('tag');
  }
};
