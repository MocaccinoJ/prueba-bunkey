const { URL_DB } = require("./config");
const mongoose = require('mongoose');
const config = require('./config');

//connecting to database
mongoose.connect(config.URL_DB, { useNewUrlParser: true })
    .then(db => console.log('Db conectada'))
    .catch(err => console.error(err));
