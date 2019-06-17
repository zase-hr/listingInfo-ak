/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');

const db = require('../postgresDB/controller.js');


const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~TEST~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get('/test1', (req, res) => {
  res.status(200).send('hiiii');
});

app.get('/testtime', (req, res) => {
  db.getTime((err, data) => {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GET ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get('/listing/:id', (req, res) => {
  db.getListingAsyncParallel(req.params.id, (err, data) => {
    //console.log(req.params.id);
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(data);
    }
  });
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.delete('/listing/:id', (req, res) => {
  db.deleteListing(req.params.id, (err, data) => {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POST ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.post('/listing', (req, res) => {
  db.insertListing(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ UPDATE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.put('/listing/:id', (req, res) => {
  db.updateListing(req.params.id, req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
