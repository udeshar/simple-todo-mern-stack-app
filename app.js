const express = require('express');
const mongoose = require('mongoose');

const crudRoutes = require('./routes/crud');

const app = express();
// const MONGODBURL = "mongodb+srv://mca2258:2xToLLTo26dtRxbQ@cluster0.d52tf0m.mongodb.net/?retryWrites=true&w=majority";
const MONGODBURL = 'mongodb://db:27017/mydatabase'; 
mongoose.set('strictQuery', false)
app.use(express.json());

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(crudRoutes);

app.use((error, req, res, next) => {

    console.log(error);
    res.status(error.statusCode || 500).json({
        message: error.message,
        data: error.data
    });

});

mongoose.connect(MONGODBURL)
    .then(result => {      
        console.log("Connected to DB");
    })
    .catch(error => {
        console.log(error);
    });

    app.listen(8080, () => {
        console.log("running")
    });
