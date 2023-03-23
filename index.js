const express = require('express')
const bodyParser = require('body-parser');
const querystring = require('querystring');
const mustache = require('mustache-express');
const app = express()
const port = 3999


app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))


app.get('/dynamic/:template', (req, res) => {
  var template = req.params.template;

  if(template == 'datetime.html'){
    res.render(template, { currentDatetime: new Date()})
  }

  if(template == 'drones.html'){
    res.render(template, availableDrones);
  }

});

app.post('/order-drone', (req, res) => {
  var droneName = req.body.droneName;
  
  
  var result = availableDrones.drones.find(x=> x.name == droneName);
  if(result == undefined){
    res.send('404');
    return;
  }

  var index = availableDrones.drones.findIndex(x=>x.name == droneName);
  availableDrones.drones.splice(index,1);

  ordered.push(result);

  res.send('Drone ordered!');
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


var ordered = [];

var availableDrones =
{
  drones: [
    {
      name: 'BeeDrone',
      lat: -38.71568,
      long: 166.25189,
      img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: 'Adorable Sensors',
      lat: 44.94397,
      long: -45.89169,
      img: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHJvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: 'Blue Twirls',
      lat: -79.35272,
      long: -69.26030,
      img: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZHJvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"

    },
    {
      name: 'Bright Skies',
      lat: -19.13399,
      long: 123.54286,
      img: "https://images.unsplash.com/photo-1479152471347-3f2e62a2b2a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRyb25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }
  ]
};