const express = require('express');
const path = require('path');
const productsRouter = require('./routes/products');
const logEvent = require('./middlewares/logEvents');
const requestLogger = require('./middlewares/requestLogger');
const PORT = 25565;

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));



app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile('./views/index.html', {root: __dirname});
});
app.get('/create(.html)?', (req, res) => {
    res.sendFile('./views/create.html', {root: __dirname});
});
app.get('/about(.html)?', (req, res) => {
    res.sendFile('./views/about.html', {root: __dirname});
});

app.get('/products(.html)?', (req, res) => {
    res.sendFile('./views/products.html', {root: __dirname});
 });

app.use('/api/products', productsRouter);

app.use(require('./middlewares/errorHandler'));
app.use(requestLogger);

app.listen(PORT, () => {
    logEvent(`Server starts listening on port ${PORT}`, 'ServerEvents.txt');
    console.log(`Server starts listening on port ${PORT}`);
});









