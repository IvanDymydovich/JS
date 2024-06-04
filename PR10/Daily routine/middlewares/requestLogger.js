const logEvent = require('./logEvents');

const requestLogger = (req, res, next) => {
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}\n`, 'requestTracing.txt');
    console.log(`${req.method}\t${req.path}`);
    next();
};

module.exports = requestLogger;