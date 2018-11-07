const express = require('express');
const app = express();
const logger = require('./logger');
const authenticator = require('./authenticator');

app.use(express.json());

// parses requests with url payloads (forms, body like: key1=value1&key2=val2...)
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(logger);
app.use(authenticator);

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