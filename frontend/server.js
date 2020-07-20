const express = require('express')
// const axios = require('axios')
const request = require('request');
const clients = require('./utils/clients')

const app = express()
const port = 8088

var display ='<html><head><title>Client List</title></head><body><h1>List of Clients</h1>{${table}}</body></html>';

app.get('/', (req, res) => {

      clients((error, clientsData) => {
          if (error) {
              return res.send({ error })
          }

          var clients = clientsData['clients'];
          createTable(clients, response =>{
            display = display.replace('{${table}}', response);
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            res.write(display, 'utf-8');
            res.end();
          });

          // res.send({
          //     data: clientsData['clients']
          // });
      });
});

//Creates the html table
createTable = (res, cb) => {
    var table ='';

    for (var i=0; i <res.length; i++) {
      table +='<tr><td>'+ (i+1) +'</td><td>'+ res[i] +'</td></tr>';
    }
    table ='<table border="1"><tr><th>Sr.</th><th>Name</th></tr>'+ table +'</table>';

    return cb(table);
};



app.listen(port, () => console.log(`Node app is listening at http://localhost:${port}`))
