module.exports = {
  generateData
};

const faker = require('faker');

function generateData(userContext, events, done) {
  userContext.vars = {
    city: faker.address.city(),
    title: faker.commerce.productName(),
    numberOfGuests: faker.random.number(12) + 2,
    isGreatLocation: faker.random.boolean(),
    description: faker.lorem.words(5 + faker.random.number(10)),
  };
  return done();
}