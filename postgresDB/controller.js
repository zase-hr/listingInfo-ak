
//const connection = require('./index.js');
const config = require('./dbconfig.js');

const { Client } = require('pg');
const client = new Client(config);
client.connect();

// const getListingItem = function (item, cb) {
// "SELECT * FROM airbnb.listings WHERE listing_id=${1};"
// "SELECT listing_id, item_name, itemgroup_name FROM (airbnb.listing_items JOIN airbnb.items ON listing_items.item_id = items.item_id) JOIN airbnb.itemgroups ON itemgroups.itemgroup_id = items.itemgroup_id  WHERE listing_items.listing_id = ${1};";
// "SELECT * FROM airbnb.listing_sleepings WHERE listing_id=${1};"
//   connection.connect(`SELECT listing_id, item_name, itemgroup_name 
//    FROM 
//    (airbnb.listing_items JOIN airbnb.items ON listing_items.item_id = items.item_id)
//    JOIN 
//    airbnb.itemgroups 
//    ON 
//    itemgroups.itemgroup_id = items.itemgroup_id  WHERE listing_items.listing_id = ${1}`, (err, result) => {
//      if (err) {
//        res.status(500);
//        res.send(err);
//      } else {
//       res.status(200);
//       res.send(result);
//      }
//    });
// };


  // pool.query(`SELECT listing_id, item_name, itemgroup_name 
  // FROM 
  // (airbnb.listing_items JOIN airbnb.items ON listing_items.item_id = items.item_id)
  // JOIN 
  // airbnb.itemgroups 
  // ON 
  // itemgroups.itemgroup_id = items.itemgroup_id  WHERE listing_items.listing_id = ${1}`)
  // .then((res) => console.log(res.row[0].name))
  // .catch(err => console.err('Error executing query', err.stack))
  


// module.export = {
//   getListingItem,
// };

const getListing = function (cb) {
  client.query('SELECT * FROM airbnb.listings WHERE listing_id=$1', [33] , cb);
}

const getTime = function(cb) {
  //cb(null, 8);
  client.query('SELECT NOW()', cb);
}

module.exports = {
  getTime,
  getListing
};