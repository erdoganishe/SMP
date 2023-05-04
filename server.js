require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const fileUpload = require("express-fileupload")
const corsOptions = require('./config/corsOptions');
const {logger} = require('./middleware/logEvents');

const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const { visitCounterByIp } = require('./middleware/sessionHandler');
//const personalCounter = require('./middleware/personalCounter');
const PORT = process.env.PORT || 3500;

// connect to DB
connectDB();

// logger
app.use(logger);
app.use(visitCounterByIp);

// Handle options credentials
app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({extended : false}));
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// static data
app.use(express.static(path.join(__dirname, '/public')));
app.use('/regpage', express.static(path.join(__dirname, '/public')));

//router
app.use('/', require('./routes/root'));
app.use('/regpage', require('./routes/regpage'));

// user auth
app.use('/register', require('./routes/auth/register'));
app.use('/auth', require('./routes/auth/auth'));
app.use('/refresh', require('./routes/auth/refresh'));
app.use('/logout', require('./routes/auth/logout'));

// (particular) with access token
// api
app.use('/api/food', require('./routes/api/food'));
app.use('/api/recipe', require('./routes/api/recipe'));

app.all('*', (req, res) => {
  res.status(404);
  if(req.accepts('html')){
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if(req.accepts('json')){
      res.json({error: "404 Not Found"});
  } else {
      res.type('txt').send("404 Not Found");
  }
});


mongoose.connection.once('open', () => {
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
