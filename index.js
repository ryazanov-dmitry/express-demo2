const express = require('express')
const bodyParser = require('body-parser');
const querystring = require('querystring');
const mustache = require('mustache-express');
var dbClient = require('./db');
const app = express()
const port = 3999


app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


app.get('/dynamic/:template', (req, res) => {
  var template = req.params.template;

  if (template == 'datetime.html') {
    res.render(template, { currentDatetime: new Date() })
  }

  if (template == 'drones.html') {

    dbClient.queryDrones(dataFromDB =>
      res.render(template, { drones: dataFromDB })
    );
  }

});

app.post('/order-drone', (req, res) => {
  var droneName = req.body.droneName;

  dbClient.orderDrone(droneName, (response) => {
    if (response.affectedRows != 1) {
      res.send('404');
      return;
    }

    res.send('Drone ordered!');
  });

});

app.post('/release', (req, res) => {
  dbClient.orderedCount((response) => {
    if(response[0].count == 0){
      res.send('No drone to release');
      return;
    }

    dbClient.release((response)=>{
      if(response.affectedRows != 1){
        res.send("Error");
        return;
      }

      res.send("Drone released");
    })
  });
});


app.get('/hello', (req, res) => {

  var myVarValue = req.query.myVar;
  res.send(myVarValue);
});

app.post('/hello', (req, res) => {
  res.send('Got a POST request')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


