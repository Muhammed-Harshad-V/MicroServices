const express = require('express');
const http = require('express-http-proxy');
const app = express();

app.use('/user' , http('http://localhost:3001'));
app.use('/captain' , http('http://localhost:3002'));

app.listen(3000, () => {
    console.log('gateway service is running on 3000')
})