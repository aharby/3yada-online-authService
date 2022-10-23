const express = require("express");
const cors = require('cors');

const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const config = require("./config");
const routes = require("./routes");

const app = express();

app.use(cors());

// middleware to parse data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// connect to Mongo DB 
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true })
    .then(() => console.log(`Mongo DB Succesfully Connected`))
    .catch(err => console.log(err));

// use routes
app.use(routes);

// check for "production" enviroment and set port
const PORT = process.env.PORT || 3001;

// start server
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
})