const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/index.js');

const port = 3002;

app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/listings/:id', (req, res) => {
  db.findOne({ id: req.params.id }).exec((err, docs) => {
    if (err) {
      res.status(500).send();
    } else {console.log(docs);
      res.status(200).send(docs);
    }
  });
});

// app.put('/listings/:id', (req, res) => {
//   // db.findOne(byid)
//   // for (var prop in req.body) {
//   //    foundOne[prop] = req.body[prop];
//   // }
//   // push
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
