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
            Statistics.updateOne({}, { $set: { hits: statisticOne.hits + 1, total: statisticOne.total + 1 } })
              .then(() => {
                //console.log(`Update: ${statisticOne.hosts}, ${statisticOne.hits}, ${statisticOne.total}`);
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
        IpList2.findOne({ ip: req.ip })
          .then((ipListOne) =>
            IpList2.updateOne({ ip: req.ip }, { $set: { count: ipListOne.count + 1 } })
              .catch((err) => {
                console.error(err);
              })
          )
          .catch((err) => {
            console.error(err);
          });
      } else {
        const currentDate = new Date().toISOString().slice(0, 10);
        ListIp.create({ ip: req.ip, date: currentDate })
          .then(() => {
            Statistics.findOne()
              .then((statisticRow) => {
                Statistics.updateOne({}, { $set: { hosts: statisticRow.hosts + 1, hits: statisticRow.hits + 1, total: statisticRow.total + 1 } })
                  .then(() => {
                    //console.log(`Create: ${statisticRow.hosts}, ${statisticRow.hits}, ${statisticRow.total}`);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
                IpList2.create({ ip: req.ip, count: 0 })
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

module.exports = { sessionHandler, visitCounterByIp };