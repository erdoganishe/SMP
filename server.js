const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const {logger} = require('./middleware/logEvents');
const PORT = process.env.PORT || 3500;

// logger
app.use(logger);

//Cross Origin Resource Sharing
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
app.use('/register', require('./routes/register'));

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
