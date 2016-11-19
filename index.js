'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express() 
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

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
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;
	 
    //console.log("Message data ", event.message);
    console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));

    var messageId = message.mid;

    var messageText = message.text;
    var messageAttachments = message.attachments;

    if(messageText) {
        switch (messageText) {
	    case 'Oculus':
	        sendGenericMessage(senderID);
		break;
	    default: 
	        sendTextMessage(senderID, messageText);
	}

    } else if(messageAttachments) {
        console.log(messageAttachments);
    	sendTextMessage(senderID, "Message with attachement received");
    }
}

function sendGenericMessage(recipientId) {
	var messageData = {
        recipient: {
            id: recipientId
        }, 

        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: "rift",
                        subtitle: "Next Generation virtual reality",
                        item_url: "https://www3.oculus.com/en-us/rift/",
                        image_url: "https://messengerdemo.parseapp.com/img/rift.png",
                        buttons: [{
                            type: "web_url",
                            url:"https://www.oculus.com/en_us/rift",
                            title: "Open Web URL"
                        }, {
                            type: "postback",
                            title: "Call Postback",
                            payload: "Payload for first bubble"
                        }]

                    }, {
                        title: "touch",
                        subtitle: "Your Hands, Now in VR",
                        item_url: "https://www.oculus.com/en_us/rift/",
                        image_url: "https://messengerdemo.parseapp.com/img/touch.png",
                        buttons: [{
                            type: "web_url",
                            url: "https://www.oculus.com/en_us/touch",
                            title:"Open Web URL"
                        }, {
                            type: "postback",
                            title: "Call Postback",
                            payload: "Payload for second bubble"
                        }]
                    }]
                }
            }
        }

    };
    callSendAPI(messageData);
}

function sendTextMessage(recipientId, messageText){
    var messageData = {
      	recipient: {
	    id: recipientId
	},

	message: {
	    text: messageText
	}
	};

    callSendAPI(messageData);
}

function callSendAPI(messageData){
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages', 
	qs: {access_token: PAGE_ACCESS_TOKEN},
	method: 'POST',
	json: messageData
	
    }, function(error, response, body) {
           if(!error && response.statusCode == 200) {
	       var recipientId = body.recipient_id;
	       var messageId = body.message_id;

	       console.log("Successfully sent generic message with id %d to recipient %s", messageId, recipientId);
	   } else {
	   	console.error("Unable to send message.");
		console.error(response);
		console.error(error);
	   }	
    } 
    
    );
}


















