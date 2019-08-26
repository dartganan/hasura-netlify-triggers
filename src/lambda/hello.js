const axios = require('axios');

var sendNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic OGE0NjNiZDgtNmYxYy00MDgxLTk1NjktNmU3ZjU0ZjY1NmVm"
  };
  
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };
  
  var https = require('https');
  var req = https.request(options, function(res) {  
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });
  
  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });
  
  req.write(JSON.stringify(data));
  req.end();
};



exports.handler = (event, context, callback) => {

  const payload = JSON.parse(event.body);

  var nameEvent = payload['event']['data']['new']['name'];


  var message = { 
    app_id: "0f25b644-56f3-4fa2-96bb-f5a72606ebb8",
    //headings: {"en": 'Faça uma pergunta na palestra'},
    contents: {"en": "nameEvent"},
    included_segments: ["All"]
  };

  console.log("ddddddddddddddddddddddddddd - ----");
  console.log(payload);

  callback(null, {
    statusCode: 200,
    body: 'Enviar Push rodando',
  });

  sendNotification(message);
};