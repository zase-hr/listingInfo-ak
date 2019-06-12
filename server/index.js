const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../postgresDB/controller.js');


const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test1', (req, res) => {
  res.status(200).send('hiiii');
});

app.get('/testtime', (req, res) => {
  db.getTime((err, data) => {
    console.log({err, data});
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(data);
    }
  });
});


app.get('/listing', (req, res) => {
  db.getListing((err, data) => {
    console.log({ x: data });
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(data.rows);
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
