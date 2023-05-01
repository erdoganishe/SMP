const { logEvents } = require('./logEvents');

const ListIp = require('../model/counter/ListIp');
const Statistics = require('../model/counter/Statistic');
const IpList2 = require('../model/counter/IpList2');

const sessionHandler = (req, res, next) => {
  const message = `${req.get('User-Agent')}\t${req.url}\t${req.ip}\t${req.headers.origin}`;
  logEvents(message, 'sesionLogs.txt');
  next();
}

const visitCounterByIp = async (req, res, next) => {
  const ip = req.ip;
  const user_agent = req.get('User-Agent');
  const ref = req.get('Referrer') || 'No';
  const user = req.get('Authorization') || 'No';

  const entry = `IP: ${ip}\tUser-agent: ${user_agent}\tURL: ${req.originalUrl}\tReferrer: ${ref}\tUsername: ${user}`;
  logEvents(entry, 'ipLog.txt');

  const currentDate = new Date().toISOString().slice(0, 10);
  ListIp.deleteMany({ date: { $ne: currentDate } })
  .catch((err) => {
    console.error(err);
  });

Statistics.updateMany({ date: { $ne: currentDate } }, { hosts: 0, hits: 0 })
  .catch((err) => {
    console.error(err);
  });

Statistics.updateMany({}, { date: currentDate })
  .catch((err) => {
    console.error(err);
  });

ListIp.findOne({ ip: req.ip })
  .then((result) => {
    if (result) {
      Statistics.findOne()
        .then((statisticOne) => {
          const newHits = statisticOne.hits + 1;
          const newTotal = statisticOne.total + 1;
          Statistics.updateOne({}, { $set: { hits: newHits, total: newTotal } })
            .then(() => {
              console.log(`${statisticOne.hosts}, ${newHits}, ${newTotal}`);
            })
            .catch((err) => {
              console.error(err);
            });
            IpList2.findOne({ip: req.ip})
            .then((ipListOne) => {
              const newCount = ipListOne.count + 1;
              IpList2.updateOne({ip: req.ip}, { $set: { count: newCount} })
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
    } else {
      const currentDate = new Date().toISOString().slice(0, 10);
      ListIp.create({ ip: req.ip, date: currentDate })
        .then(() => {
          Statistics.findOne()
            .then((statisticRow) => {
              const newHosts = statisticRow.hosts + 1;
              const newHits = statisticRow.hits + 1;
              const newTotal = statisticRow.total + 1;
              Statistics.updateOne({}, { $set: { hosts: newHosts, hits: newHits, total: newTotal } })
                .then(() => {
                  console.log(`${newHosts}, ${newHits}, ${newTotal}`);
                })
                .catch((err) => {
                  console.error(err);
                });
                IpList2.create({ip: req.ip, count: 0})
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

  next();
};

module.exports = { sessionHandler, visitCounterByIp};