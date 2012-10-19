var express = require('express'), http = require('http');
var app = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

var updates = [
    { id: 1, text: 'one' },
    { id: 2, text: 'two' },
    { id: 3, text: 'three' },
    { id: 4, text: 'four' }
];

var count = 5;

setInterval(function () {
    updates.push({ id: count, text: 'item ' + count++ }); 
}, 1000);

app.get('/', function (req, res) {
    res.render("index.jade");
});

app.get('/updates', function (req, res) {
    res.json(updates);
});

http.createServer(app).listen(3000);
