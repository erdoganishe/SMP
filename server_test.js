const express = require('express');
const app = express();
app.enable('trust proxy');
const connectDB = require('./config/dbConn');
connectDB();

const currentDate = new Date().toISOString().slice(0, 10);
const ListIp = require('./model/counter/ListIp');
const Statistics = require('./model/counter/Statistic');

ListIp.deleteMany({ date: { $ne: currentDate } })
  .then(() => {
    console.log('Deleted rows from "list_ip" collection where date is not equal to the current date');
  })
  .catch((err) => {
    console.error(err);
  });

Statistics.updateMany({ date: { $ne: currentDate } }, { hosts: 0, hits: 0 })
  .then(() => {
    console.log('Updated "statistics" collection by setting hosts and hits to 0');
  })
  .catch((err) => {
    console.error(err);
  });

Statistics.updateMany({}, { date: currentDate })
  .then(() => {
    console.log('Updated "statistics" collection by setting the date to the current date');
  })
  .catch((err) => {
    console.error(err);
  });

const userIp = req.ip;
ListIp.findOne({ ip: userIp })
  .then((result) => {
    if (result) {
      console.log('The IP exists in the "list_ip" collection');
    } else {
      console.log('The IP does not exist in the "list_ip" collection');
    }
  })
  .catch((err) => {
    console.error(err);
  });

ListIp.findOne({ ip: req.ip })
  .then((result) => {
    if (result) {
      Statistics.findOne()
        .then((row) => {
          const newHits = row.hits + 1;
          const newTotal = row.total + 1;
          Statistics.updateOne({}, { $set: { hits: newHits, total: newTotal } })
            .then(() => {
              output_img(row.hosts, newHits, newTotal);
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      const currentDate = new Date().toISOString().slice(0, 10);
      ListIp.create({ ip: req.ip, date: currentDate })
        .then(() => {
          Statistics.findOne()
            .then((row) => {
              const newHosts = row.hosts + 1;
              const newHits = row.hits + 1;
              const newTotal = row.total + 1;
              Statistics.updateOne({}, { $set: { hosts: newHosts, hits: newHits, total: newTotal } })
                .then(() => {
                  output_img(newHosts, newHits, newTotal);
                })
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  })
  .catch((err) => {
    console.error(err);
  });