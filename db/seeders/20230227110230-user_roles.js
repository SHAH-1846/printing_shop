'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert(
      "user_roles",
      [
        {
          id : 1,
          role : "admin",
          createdAt : "2018-10-2",
          updatedAt : "2018-10-2"
          
        },
        {
          id : 2,
          role : "user",
          createdAt : "2018-10-2",
          updatedAt : "2018-10-2"
          
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
