'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./db/venue.json', 'utf-8')).map((el) => {
      el.name, el.price, el.description, el.imageUrl, el.address, el.phoneNumber, el.CategoryId, el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert("Venues", data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Venues', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
  }
};
