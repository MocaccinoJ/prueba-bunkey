//Inicializar y Utilizar express
const path = require('path');

const morgan = require('morgan');

const mongoose = require('mongoose');

const express = require('express');

const app = express();

const bodyParser = require('body-parser'); //connecting to database


mongoose.connect('mongodb://localhost/crud-bunkey', {
  useNewUrlParser: true
}).then(db => console.log('Db conectada')).catch(err => console.error(err)); // importing routes

const indexRoutes = require('./routes/index'); // settings 


app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); //routes

app.use('/', indexRoutes); //starting the server

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});