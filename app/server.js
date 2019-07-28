var express = require('express');
var path = require('path');
var server = express(); // better instead

server.use(express.static(path.join(__dirname, '../build')));
server.get(/.*/, function (req, res) {
  res.sendFile('index.html', {
    root: path.join(__dirname, '../build')
  });
})
server.listen(3000);