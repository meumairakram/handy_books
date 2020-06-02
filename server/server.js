const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/api');


const app = express();

const port = process.env.PORT || 3001;

// Importing Schemas
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api',apiRoutes);



app.listen(port,() => {
    console.log('Server is Listening on Port.');
});