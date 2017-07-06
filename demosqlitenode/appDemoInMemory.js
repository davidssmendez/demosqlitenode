var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('blogNode');//creamos la base de datos llamada blogNode si no existe
db.serialize(function() {

  db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)');
  var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

  for (var i = 0; i < 100; i++) {
    stmt.run('Ipsum ' + i);
  }

  stmt.finalize();
  var listado = '';

  db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
    //console.log(row.id + ': ' + row.info);
    listado = listado +row.info;
  });
});

db.close();
  res.send('Hello World!'+listado);

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});