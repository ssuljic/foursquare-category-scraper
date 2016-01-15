var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res) {
  var url = 'https://developer.foursquare.com/categorytree';

  request(url, function(error, response, html) {
    if(!error) {
      var $ = cheerio.load(html);
      var map = {};

      $('.categoryDescription').each(function (i, el) {
        var name = $(this).find('.name').first().text().trim();
        var id = $(this).find('.id').first().text().trim();
        map[id] = name;
      });

      res.send(map);
    }
  });
});

app.listen('8081');
console.log('UP');
exports = module.exports = app;