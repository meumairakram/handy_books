const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/api');


const app = express();

const port = process.env.PORT || 3001;

// Importing Schemas
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('/client/build'));
app.use('/api',apiRoutes);

if(process.env.NODE_ENV == 'production') {
    const path = require('path');
    app.get('/*',(req,res) => {
        res.sendfile(__dirname,path.resolve('../client/build','index.html'));
    })
}


app.listen(port,() => {
    console.log('Server is Listening on Port.');
});