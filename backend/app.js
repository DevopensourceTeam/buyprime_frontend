/* eslint-disable */
let express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

// Initialize the app
let app = express();

app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes'));

// finally, let's start our server...
var server = app.listen( process.env.PORT || 8080, function(){
    console.log('Listening on port ' + server.address().port);
});