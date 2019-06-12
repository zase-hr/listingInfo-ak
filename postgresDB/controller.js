const connection = require('./index.js');

// eslint-disable-next-line func-names
const getListingItem = function (cb) {
  connection.query(`SELECT 
     airbnb.listings.listing_id as listing_id,
     airbnb.listings.city as city,
     airbnb.listings.title as title,
     airbnb.listings.hostImage as hostImage,
     airbnb.listings.roomInfo as roomInfo,
     airbnb.listings.numberOfGuests as numberOfGuests,
     airbnb.listings.numberOfBedrooms as numberOfBedrooms,
     airbnb.listings.numberOfBeds as numberOfBeds ,
     airbnb.listings.numberOfBaths as numberOfBaths
     airbnb.listings.isSuperhost as isSuperhost,
     airbnb.listings.isGreatLocation as isGreatLocation ,
     airbnb.listings.isSparklingClean as isSparklingClean 
     airbnb.listings.isGreatCheckIn as isGreatCheckIn,
     airbnb.listings.isSelfCheckIn as isSelfCheckIn,
     airbnb.listings.description as description
     airbnb.listing_items.item_id,
     airbnb.listings.* 
     FROM listings JOIN listing_items ON 
     listings.listing_id = listing_items.listing_id 
     WHERE listings.listing_id = 9000000;`, cb);
};


// const getListings = function (cb) {
//   connection.query(`select 
//   airbnb.listings.listing_id as listing_id,
//   airbnb.listings.city as city,
//   airbnb.listings.title as title,
//   airbnb.listings.hostImage as hostImage,
//   airbnb.listings.roomInfo as roomInfo,
//   airbnb.listings.numberOfGuests as numberOfGuests,
//   airbnb.listings.numberOfBedrooms as numberOfBedrooms,
//   airbnb.listings.numberOfBeds as numberOfBeds ,
//   airbnb.listings.numberOfBaths as numberOfBaths
//   airbnb.listings.isSuperhost as isSuperhost,
//   airbnb.listings.isGreatLocation as isGreatLocation ,
//   airbnb.listings.isSparklingClean as isSparklingClean 
//   airbnb.listings.isGreatCheckIn as isGreatCheckIn,
//   airbnb.listings.isSelfCheckIn as isSelfCheckIn,
//   airbnb.listings.description as description`, cb);
// };


// const getlistingsleepings = function (cb) {
//   connection.query (`select
//   airbnb.listing_sleepings.room_type as room_type,
//   airbnb.listing_sleepings.room_beds as room_beds, 
//   `, cb);
// };


// const getItemGroups = function (cb) {
//   connection.query (`select 
//   airbnb.itemgroups.itemgroup_id as itemgroup_id,
//   airbnb.itemgroups.temgroup_name,
//   `, cb);
// };

// const getListingitems = function (cb) {
//   connection.query (`
//   `, cb);
// };


module.export = {
  getListingItem,
  getListings,
  getlistingsleepings,
  getItemGroups,
  getListingitems,
};
