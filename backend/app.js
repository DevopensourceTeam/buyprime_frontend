/* eslint-disable */
let express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

// Initialize the app
let app = express();
global.URL_BACKEND = 'http://magento23pwa.test/index.php/rest';

app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes'));

// finally, let's start our server...
var server = app.listen( process.env.PORT || 8080, function(){
    console.log('Listening on port ' + server.address().port);
});