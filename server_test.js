require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const personalCounter = require('./middleware/personalCounter');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;

// connect to DB
connectDB();
const fs = require('fs');
const path = require('path');
const Food = require('./model/Food');

let i = 1;

// Food.find({}).then((docs) => {
//     docs.forEach((doc) => {
//          fs.rename(path.join(__dirname, 'public', 'img', 'front_img', `${i}.jpg`), path.join(__dirname, 'public', 'img', 'front_img', `${doc.id}.jpg`), (err) => {
//             if(err) {
//                 i++;
//                 fs.rename(path.join(__dirname, 'public', 'img', 'front_img', `${i}.jpg`), path.join(__dirname, 'public', 'img', 'front_img', `${doc.id}.jpg`), (err) => {
//                     if(err) {
//                         i++;
//                     }
//                  });
//             }
//          });
//     });
// });

//console.log(readfile);


//

// Handle options credentials
//app.use(credentials)

//Cross Origin Resource Sharing
//app.use(cors(corsOptions));

//app.use(express.urlencoded({extended : false}));
//app.use(express.json());

//middleware for cookies
//app.use(cookieParser());

// static data
//app.use(express.static(path.join(__dirname, '/public')));
//app.use('/regpage', express.static(path.join(__dirname, '/public')));



mongoose.connection.once('open', () => {
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
