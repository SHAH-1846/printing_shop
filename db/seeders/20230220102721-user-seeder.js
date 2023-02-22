"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
      "users",
      [
        {
          id : 1,
          name : 'James S. Waters',
          email : 'james@gmail.com',
          phone : '225-572-2376',
          type : 'Admin', 
          password : '$2a$10$vKssVNL27gR1kGLHi56L7.zz0oYic4AoNfmFofsugpdzBjgS7OlIK' //Admin#123
          
        },
        {
          id : 2,
          name : 'Mary J. Berube',
          email : 'mary@gmail.com',
          phone : '619-934-0179' ,
          type : 'Admin', 
          password : '$2a$10$9RMUt4Bv9gs.Sg/QD5phTuQKTay13TtmQ2ryvizJa3Eism4XDat5O' //Admin#1234
          
        },
        {
          id : 3,
          name : 'Maynard C. Glover',
          email : 'maynard@gmail.com',
          phone : '323-836-7627',
          type : 'user', 
          password : '$2a$10$dnzsYDbbIxxEJacxsIRUJOSZQiJ77/1jWpp6iH7pXUOkZVzOVktXC' //user1#123
          
        },
        {
          id : 4,
          name : 'Katie S. Russell',
          email : 'katie@gmail.com',
          phone : '860-208-4175',
          type : 'user', 
          password : '$2a$10$0IsR2.h69rRJR0w.TY7ftOOguMfSmbs3uUfjHJzSE97IhpnOx3cnO' //user2#1234
          
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
