var express = require('express');
var app = express();
var request = require('request');

app.use(express.static('public'));

app.get('/hello', function (req, res) {
    res.send('Hello World!');
});

app.get('/flightsearch', function (req, res) {
    var origin = req.query.origin
    var destination = req.query.destination

    request({
        url: 'https://maps.googleapis.com/maps/api/directions/json?'+'key=AIzaSyCCvw_1ASiIIZ0jZDjvG9rnh1FecDojlwI'+
            '&origin=\"' + origin+ '\"'+
            '&destination=\"' + destination + '\"' +
            '&mode=driving',
        method: 'GET'


    },function(error, response, body){
        if(error) {
            res.send({price: 150})
        } else {
            try {
                var directions = JSON.parse(body)
                var distance = directions.routes[0].legs[0].distance.text
                var duration = directions.routes[0].legs[0].duration.text


//                res.send(body.routes)
                //res.send(body.aggregations['top-origin']['buckets'][0]['min_price_hits']['hits']['hits'][0]['_source'])
            }
            catch(err) {
                console.log(err)
                res.send({price: 'body failure'})
            }
        }
    });





});

app.get('/pricing/:code', function (req, res) {
  request({
      url: 'http://es-airsearchresults-001.cpeg.orbitz.net:9200/latestairsearches/_search ', //URL to hit
      method: 'POST',
      //Lets post the following key/values as form
      json: {
          "size": 0,
          "query" : {
            "filtered" : {
              "query" : {
                "match_all" : { }
              },
              "filter" : {
                "bool" : {
                  "must" : [ {
                    "term" : {
                      "posCode" : "orb"
                    }
                  }, {
                    "term" : {
                      "currencyCode" : "usd"
                    }
                  }, {
                    "range" : {
                      "departureDate" : {
                        "from" : "now",
                        "to" : null,
                        "include_lower" : false,
                        "include_upper" : true
                      }
                    }
                  }, {
                    "terms" : {
                      "origin" : ["ord","mdw"]
                    }
                  }, {
                    "term" : {
                      "destination" : req.params.code
                    }
                  } ]
                }
              }
            }
          },
          "aggregations" : {
            "top-origin" : {
              "terms" : {
                "field" : "origin"
              },
              "aggregations" : {
                "min_price_hits" : {
                  "top_hits" : {
                    "size" : 1,
                    "sort" : [ {
                      "price" : {
                        "order" : "asc"
                      }
                    } ]
                  }
                }
              }
            }
          }
        }
  }, function(error, response, body){
      if(error) {
        res.send({price: 150})
      } else {
        try {
          res.send(body.aggregations['top-origin']['buckets'][0]['min_price_hits']['hits']['hits'][0]['_source'])
        }
        catch(err) {
          res.send({price: 150})
        }
      }
  })
});

// dates must be in YYYY-MM-DD format
app.get('/minPrice/:startDate/:endDate', function (req, res) {
  request({
    url: 'http://es-airsearchresults-001.cpeg.orbitz.net:9200/latestairsearches/_search?search_type=count', //URL to hit
    method: 'POST',
    //Lets post the following key/values as form
    json: {
        "query": {
          "filtered": {
            "filter" : {
              "bool": {
                "must": [
                  {"term": {"posCode": "orb"}},
                  {"term": {"currencyCode": "usd"}},
                  {"terms": {"origin": ["ord", "mdw"]}},
                  {"term": {"destination": "pdx"}},
                  {
                    "range": {
                      "departureDate": {
                        "gte": req.params.startDate,
                        "lt": req.params.endDate
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        "aggs": {
          "min_price_hits": {
            "top_hits": {
              "sort": "price",
              "size": 1
            }
          }
        }
      }
  }, function(error, response, body){
      if (error) {
        res.send({price:'search'})
      } else {
        try {
          if (body.hits.total > 0) {
            res.send(body.aggregations.min_price_hits.hits.hits[0]._source)
          } else {
            res.send({price: -1.0})
          }
        }
        catch(err) {
          res.send({price:'search'})
        }
      }
  })
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

