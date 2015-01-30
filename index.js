var express = require('express'),
    favicon = require('serve-favicon'),
    path = require('path');

var app = express();

app.set('port', process.env.PORT || 80);
app.use(favicon(path.join(__dirname, 'src', 'img', 'favicon.ico')));
app.use('/static', express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'dist', 'html', 'index.html'));
});

app.get('/*', function(req,res) {
  res.status(200).sendFile(path.join(__dirname, 'dist', 'html', '404.html'));
});

app.listen(3000);