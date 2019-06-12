const postgres = require('postgres');
const config = require('./dbconfig.js');

const connection = postgres.createConnection(config);
connection.connect();

module.exports = connection;
