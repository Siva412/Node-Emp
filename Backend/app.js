const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const app = express();

mongoose.connect('mongodb+srv://siva:Karthik%401@cluster0.lykgc.mongodb.net/angular-emp?retryWrites=true&w=majority',
{ useNewUrlParser: true, useCreateIndex: true }).then(() => {
    console.log("DB connection successful");
}).catch(err => {
    console.log("DB connection failed");
});

app.use(bodyParser.json());

app.use("/api/user", userRoutes);

module.exports = app;