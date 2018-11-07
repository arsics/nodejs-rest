const express = require('express');
const app = express();
const logger = require('./logger');
const authenticator = require('./authenticator');

app.use(express.json());

app.use(logger);
app.use(authenticator);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));