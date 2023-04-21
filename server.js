const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const PORT = process.env.PORT || 3500;

// logger
app.use(logger);

//Cross Origin Resource Sharing
const whitelist = ['https://www.DOMAINNAME.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
  origin: (origin, callback) => {
    if(whitelist.indexOf(origin) !== -1 || !origin){ // REMOVE || !origin
      callback(null, true);
    } else {
      callback(new Error('Not allowed by cors'));
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.urlencoded({extended : false}));
app.use(express.json());
// static data
app.use(express.static(path.join(__dirname, '/public')));
app.use('/regpage', express.static(path.join(__dirname, '/public')));
//router
app.use('/', require('./routes/regpage'));
app.use('/food', require('./routes/api/food'));
app.use('/', require('./routes/root'));

app.all('*', (req, res) => {
  res.status(404);
  if(req.accepts('html')){
      res.sendFile(path.join(__dirname, '../views', '404.html'));
  } else if(req.accepts('json')){
      res.json({error: "404 Not Found"});
  } else {
      res.type('txt').send("404 Not Found");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
