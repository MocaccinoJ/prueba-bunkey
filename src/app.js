//Inicializar y Utilizar express
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//connecting to database
require('./database');

// importing routes
const { courses, enrollment, students, users, querys } = require('./router');

// settings 
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use('/courses', courses);
app.use('/enrollment', enrollment);
app.use('/students', students);
app.use('/users', users);
app.use('/querys', querys);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});