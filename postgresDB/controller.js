/* eslint-disable func-names */

const { Pool } = require('pg');
const config = require('./dbconfig.js');

const pool = new Pool(config);
pool.connect();

const getListing = async function (targetId, cb) {
  pool.query(`SELECT * FROM airbnb.listings WHERE listing_id=${targetId}`, (err1, data1) => {
    if (err1) {
      cb(err1);
    } else {
      pool.query(`SELECT listing_id, item_name, itemgroup_name
                    FROM (airbnb.listing_items JOIN airbnb.items
                    ON listing_items.item_id = items.item_id) JOIN airbnb.itemgroups
                    ON itemgroups.itemgroup_id = items.itemgroup_id  WHERE listing_items.listing_id = ${targetId}`, (err2, data2) => {
        if (err2) {
          cb(err2);
        } else {
          pool.query(`SELECT * FROM airbnb.listing_sleepings WHERE listing_id=${targetId}`, (err3, data3) => {
            if (err3) {
              cb(err3);
            } else {
              const allData = Object.assign({}, data1.rows[0]);
              allData.items                = data2.rows.length >= 1 ? data2.rows[0] : {};
              allData.sleepingArrangements = data3.rows.length >= 1 ? data3.rows[0] : {};
              cb(undefined, allData);
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

const insertListing = function (body, cb) {
  const {
    city,
    title,
    numberOfGuests,
    isGreatLocation,
    description,
  } = body;
  pool.query(`INSERT INTO airbnb.listings (city,title,numberOfGuests,isGreatLocation,description) VALUES ("${city}","${title}",${numberOfGuests},${isGreatLocation},"${description}")`, cb);
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
