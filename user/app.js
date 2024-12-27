const express = require('express');
const http = require('http')
const app = express()
const UserRoutes = require('./routes/userROutes');
const cookieParser = require('cookie-parser');
const server = http.createServer(app)
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());


app.use('/', UserRoutes);


mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


server.listen(3001, () => {
    console.log('user service is running on port 3001')
});