const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authUser = require('./middleware/auth');

const cors = require('cors');

const userRoutes = require('./routes/user');
const empRoutes = require('./routes/employee');
const app = express();

mongoose.connect('mongodb+srv://',
{ useNewUrlParser: true, useCreateIndex: true }).then(() => {
    console.log("DB connection successful");
}).catch(err => {
    console.log("DB connection failed", err);
});

app.use(bodyParser.json());
app.use(cors());
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});*/
app.use("/api/user", userRoutes);
app.use("/api/emp", authUser, empRoutes);

module.exports = app;