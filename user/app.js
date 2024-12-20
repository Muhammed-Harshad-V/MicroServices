const express = require("express");
const http = require('http')
const app = express()
const UserRoutes = require('./routes/userROutes');
const cookieParser = require('cookie-parser');
const server = http.createServer(app)


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());


app.use('/user', UserRoutes);


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


server.listen(3001, () => {
    console.log('user service is running on port 3001')
});