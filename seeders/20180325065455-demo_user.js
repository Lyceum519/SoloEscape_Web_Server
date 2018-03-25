'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('local_users', [{
          email : 'test@test.com',
          password : '1234',
          createdAt: "1990-09-01",
          updatedAt: "2000-08-02"
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('local_users', null, {});
  }
};