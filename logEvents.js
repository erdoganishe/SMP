const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss\n')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

module.exports = logEvents;