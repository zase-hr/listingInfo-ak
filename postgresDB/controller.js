/* eslint-disable func-names */

const { Pool } = require('pg');
const config = require('./dbconfig.js');

const pool = new Pool(config);
pool.connect();

const getListing = async function (targetId, res) {
  pool.query(`SELECT * FROM airbnb.listings WHERE listing_id=${targetId}`, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      pool.query(`SELECT listing_id, item_name, itemgroup_name
                    FROM (airbnb.listing_items JOIN airbnb.items
                    ON listing_items.item_id = items.item_id) JOIN airbnb.itemgroups
                    ON itemgroups.itemgroup_id = items.itemgroup_id  WHERE listing_items.listing_id = ${targetId}`, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            pool.query(`SELECT * FROM airbnb.listing_sleepings WHERE listing_id=${targetId}`, (err, data) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.status(200);
                res.send(data.rows);
              }
            });
          }
        });
      }
  });
};

// const getListing = function (targetId, cb) {
//   client.query(`SELECT * FROM airbnb.listings WHERE listing_id=${targetId};`, cb);
// };


const deleteListing = async function (targetId, cb) {
  pool.query(`DELETE FROM airbnb.listings WHERE listing_id =${targetId};`, cb);
};

const insertListing = function (city, title, numberOfGuests, isGreatLocation, description, cb) {
  pool.query(`INSERT INTO airbnb.listings (city, title,numberOfGuests,isGreatLocation,description) VALUES (${city},${title},${numberOfGuests},${isGreatLocation},${description})`, cb);
};

const updateListing = function (city, title, cb) {
  pool.query(`UPDATE airbnb.listings SET city= ${city} title= ${title} WHERE id = ${listing_id}`, cb);
};

const getTime = async function (cb) {
  pool.query('SELECT NOW()', cb);
};

module.exports = {
  getTime,
  getListing,
  deleteListing,
  insertListing,
  updateListing,
};
