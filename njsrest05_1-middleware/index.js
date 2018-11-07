const express = require('express');
const morgan = require('morgan');
const app = express();
const logger = require('./logger');
const authenticator = require('./authenticator');
const config = require('config');

// set this environemt variable on Win with: 'set NODE_ENV=production'
console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // default value is 'undefined'
console.log(`app: ${app.get('env')}`); // default value is 'development'

app.use(express.json());

// parses requests with url payloads (forms, body like: key1=value1&key2=val2...)
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(logger);
app.use(authenticator);

// Configuration
console.log('Application name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));

if (app.get('env') === 'development') { // only log http requests on development environment
    console.log('Morgan enabled');
    app.use(morgan('tiny'));
}

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course); // return created object to the client
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));