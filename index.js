'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
});

// for Facebook verification
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
});

app.post('/webhook', function(req, res){

        var data = req.body;

        if(data.object == 'page') {
            data.entry.forEach(function(entry){
                var pageID = entry.id;
                var timeOfEvent = entry.time;

                entry.messaging.forEach(function(event) {
                    if(event.message) {
                        receivedMessage(event)
                    } else {
                        console.log("Webhook received unknown event : ", event);
                    }
                })
            })
            res.sendStatus(200);
        }
});

function receivedMessage(event) {

    console.log("Message data ", event.message);
}