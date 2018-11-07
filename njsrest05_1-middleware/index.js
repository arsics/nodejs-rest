const express = require('express');
const app = express();

app.use(express.json());

/**
 * A middleware function for logging
*/
app.use((req, res, next) => {
    console.log('Logging');
    next(); // if commented out the request will hang
});


app.get('/', (req, res) => {
    res.send('Hello world!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));