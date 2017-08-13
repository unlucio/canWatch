const express = require('express');
const path = require('path');
const morgan = require('morgan')
const app = express();
const server = require('http').Server(app);


app.use(morgan('combined'));
app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.end('yo');
});

server.listen(app.get('port'), function () {
  console.log('CanWatch listening on ' + app.get('port'))
});
