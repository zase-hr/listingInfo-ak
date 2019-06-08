/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const N = 10 * 1000 * 1000;
const LOG_STEP = 100 * 1000;
const DRAIN_LOG_STEP = 10 * 1000;
const TOTAL_ITEMS_DEFINED = 37;

let drainCount = 0;

// returns a promise that resolves when the write (or write + drain) is done
function writeWithDrain(writer, obj) {
  return new Promise(function (resolve) {
    if (writer.write(obj)) {
      resolve();
    } else {
      ++drainCount;
      if (drainCount % DRAIN_LOG_STEP == 0) {
        console.timeLog('process', `>>> draining for the ${drainCount} time!`);
      }
      writer.once('drain', resolve);
    }
  });
}

const listingsGen = async () => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('listings.csv'));
  for (let i = 0; i < N; i++) {
    if (i % LOG_STEP === 0) {
      console.timeLog('process', `creating listing ${i}`);
    }
    const listingObject = {
      listing_id: i + 1,
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
    };
    // writer.write(listingObject);
    await writeWithDrain(writer, listingObject);
  }
  writer.end();
  console.log('done with listingsGen');
};


const listingSleepingsGen = async () => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('sleeping.csv'));
  for (let i = 0; i < N; i++) {
    if (i % LOG_STEP === 0) {
      console.timeLog('process', `creating sleeping ${i}`);
    }
    const roomCount = 1 + faker.random.number(4);
    for (let j = 0; j < roomCount; j++) {
      const room = {
        listing_id: i + 1,
        room_type: `${faker.random.arrayElement(['Bedroom', 'Space', 'Room'])} ${j + 1}`,
        room_beds: `${faker.random.arrayElement(['Twin', 'Queen', 'King', 'Double', 'Sofa'])} bed`,
      };
      await writeWithDrain(writer, room);
    }
  }
  writer.end();
  console.log('done with listingsleepingsGen');
};


const listingItemsGen = async () => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('listingitems.csv'));
  for (let i = 0; i < N; i++) {
    if (i % LOG_STEP === 0) {
      console.timeLog('process', `creating lisitngItem ${i}`);
    }
    const itemCount = 1 + faker.random.number(5);
    for (let j = 0; j < itemCount; j++) {
      const listingItem = {
        listing_id: i + 1,
        item_id: faker.random.number(TOTAL_ITEMS_DEFINED - 1) + 1,
      };
      await writeWithDrain(writer, listingItem);
    }
  }
  writer.end();
  console.log('done with listingItemsGen');
};

// const hrstart = process.hrtime();
// const hrend = process.hrtime(hrstart);


console.time('process');
listingsGen();
console.timeLog('process', 'listing is generated');
listingSleepingsGen();
console.timeLog('process', 'sleeping is generated');
listingItemsGen();
console.timeLog('process', 'items is generated');
