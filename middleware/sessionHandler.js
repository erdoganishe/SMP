const session = require('express-session');
const { logEvents } = require('./logEvents');

const sessionSettings = session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { }
});

const sessionHandler = (req, res, next) => {
    const message = `${req.get('User-Agent')}\t${req.url}\t${req.socket.remoteAddress.split(':').at(-1)}\t${req.headers.origin}`;
    logEvents(message, 'sesionLogs.txt');
    next();
}

module.exports = { sessionSettings, sessionHandler };