const express = require('express');
const bodyParser = require('body-parser');

// controller for rest api
const routes = require('./routes');

// handle cors
const cors = require('cors');
// create an app 
const app = express();

const port = process.env.PORT || 3000;

// enable CORS
app.use(cors());

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
// logging request
app.use((req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
});

// routes
app.get('/', (req, res) => {
    res.json({
        info: 'Customer Rating Application'
    })
});

// routes & controllers of api
app.use('/api', routes);

// handle pages not found
app.use((req, res, next) => {
    return res.status(404).send({ message: req.url + ' not found.' });
});

// Any error
app.use(function (err, req, res, next) {
    return res.status(500).send({ error: err });
});

app.listen(port, () => {
    console.log(`App is listening at ${port}`);
});

module.exports = app;
