const express = require('express');
const request = require('request');
const clients = require('./utils/clients');
let ejs = require('ejs');

const app = express();
const port = 8088;

app.set('views', './views')
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {

      clients((error, clientsData) => {
          if (error) {
              return res.send({ error })
          }

          res.render('index', {clients: clientsData['clients']})

      });
});


app.listen(port, () => console.log(`Node app is listening at http://localhost:${port}`))
