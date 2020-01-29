const argon2 = require('argon2');
const randomBytes = require('randombytes');
require('dotenv').config();

// hashed password
const getHashedPassword = async () => {
  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(process.env.ADMIN_PASSWORD, { salt });
  return hashedPassword;
};

//Having a async function it needs to be async also and the get func has to await
module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Admins', [{
    name: 'admin',
    password: await getHashedPassword(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
