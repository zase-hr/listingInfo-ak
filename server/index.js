const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database MongoDB/index.js');

const port = 3002;

app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/listing/:id', (req, res) => {
  db.getListingItem((err, data) => {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(data[0]);
    }
  });
});

// app.put('/listing/:id', (req, res) => {
//   db.listings.findByIdAndUpdate()({ id: req.params.id }, { id: req.params.id }).exec((err, docs) => {
//     if (err) {
//       res.status(500).send();
//     } else {
//       console.log('hi, I update one listing information object');
//       res.status(200).send(docs);
//     }
//   });
// });

// app.post('/listing', (req, res) => {
//   db.listings.create({ id: req.body.id }).exec((err, docs) => {
//     if (err) {
//       res.status(500).send();
//     } else {
//       console.log('hi, I get one listing information');
//       res.status(200).send(docs);
//     }
//   });
// });

// app.delete('/listing/:id', (req, res) => {
//   db.listings.findByIdAndRemove({ id: req.params.id }).exec((err, docs) => {
//     if (err) {
//       res.status(500).send();
//     } else {
//       console.log('hi, I remove one listing information');
//       res.status(200).send(docs);
//     }
//   });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
