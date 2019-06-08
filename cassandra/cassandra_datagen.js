const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');

const writer = csvWriter({
  separator: ';',
  headers: ['id', 'city', 'title', 'hostImage', 'roomInfo', 'numberOfGuests', 'numberOfBedrooms', 'numberOfBeds', 'numberOfBaths', 'isSuperhost', 'isGreatLocation', 'isSparklingClean', 'isGreatCheckIn', 'isSelfCheckIn', 'description', 'amenities_basic', 'amenities_dining', 'amenities_bedAndBath', 'sleepingArrangements'],
});
writer.pipe(fs.createWriteStream('listing.csv'));

let drainsCount = 0;

const hrstart = process.hrtime();

// we need to stringify array and objects, using single quote
function singleQuoteStringify(obj) {
  return JSON.stringify(obj).replace(/"/g, "'");
}

// ~~~~~~~~~~~~~~~~~ Random Generators ~~~~~~~~~~~~~~~~~~~


const N = 10 * 1000 * 1000;

function randomSubArray(arr) {
  return arr.filter(faker.random.boolean);
}

function randomSleepingArrangements() {
  const obj = {};
  const size = 1 + faker.random.number(4);
  for (let i = 0; i < size; i++) {
    obj[`${faker.random.arrayElement(['Bedroom', 'Space', 'Room'])} ${i + 1}`] 
    = `${faker.random.arrayElement(['Twin', 'Queen', 'King', 'Double', 'Sofa'])} bed`;
  }
  return obj;
}

function generateRow(i) {
  if (i === N || i % 10000 === 0) {
    const hrend = process.hrtime(hrstart);
    console.info('... creating record #%d -- Execution time (hr): %ds %dms', i, hrend[0], hrend[1] / 1000000);
  }

  if (i === N) {
    console.log(`Done ${N} records added!`);
    writer.end();
    return;
  }

  const listingObject = {
    id: (i + 1),
    city: faker.address.city(),
    title: faker.commerce.productName(),
    hostImage: faker.image.avatar(),
    roomInfo: faker.company.catchPhrase(),
    numberOfGuests: faker.random.number(12) + 2,
    numberOfBedrooms: faker.random.number(5) + 1,
    numberOfBeds: faker.random.number(12) + 1,
    numberOfBaths: faker.random.number(5) + 1,
    isSuperhost: faker.random.boolean(),
    isGreatLocation: faker.random.boolean(),
    isSparklingClean: faker.random.boolean(),
    isGreatCheckIn: faker.random.boolean(),
    isSelfCheckIn: faker.random.boolean(),
    description: faker.lorem.words(5 + faker.random.number(10)),
    amenities_basic: singleQuoteStringify(randomSubArray(['wifi', 'laptop area', 'iron', 'toilet papers', 'chargin station', 'tv', 'radio'])),
    amenities_dining: singleQuoteStringify(randomSubArray(['kithcen', 'utensil', 'pans', 'pots', 'skillets', 'coffee maker', 'tea maker'])),
    amenities_bedAndBath: singleQuoteStringify(randomSubArray(['shampoo', 'hair dryer', 'hanger', 'body wash', 'towel', 'pillow', 'sheets'])),
    sleepingArrangements: singleQuoteStringify(randomSleepingArrangements()),
  };


  if (writer.write(listingObject)) {
    generateRow(i + 1);
  } else {
    //console.log('write failed...');
    ++drainsCount;
    writer.once('drain', () => {
      if (drainsCount % 10000 === 0) {
        console.log('draining for the ' + drainsCount + ' time!');
      }
      generateRow(i + 1);
    });
  }
}

generateRow(0);
