
const config = require('../config/config').get(process.env.NODE_ENV);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(config.DATABASE);


module.export = mongoose;
