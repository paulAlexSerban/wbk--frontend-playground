const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// set the View Engine or the Templating Engine to EJS
app.set('view engine', 'ejs');

// set the root to the views in the `./views` directory
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

// set path tp static asssest such as CSS and JS in the `./public` directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);