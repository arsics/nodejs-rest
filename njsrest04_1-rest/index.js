const Joi = require('Joi'); // class
const express = require('express');
const app = express();

app.use(express.json()); // enable json body processing

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

// using path and req params:
app.get('/api/courses/:year/:month', (req, res) => {
    // try with 'http://localhost:5000/api/courses/2018/11?sortBy=name'
    // res.send(req.params);
    res.send(req.query);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status('404').send('Course with that ID was not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course); // return created object to the client
});

app.put('/api/courses/:id', (req, res) => {
    // look up the course and validate, return 404 if not existing or 400 if invalid
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status('404').send('Course with that ID was not found');
    const { error } = validateCourse(req.body); // destructured body object
    if (error) return res.status(400).send(error.details[0].message);
    
    // update the course and return it
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status('404').send('Course with that ID was not found');
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

// PORT environment variable (execute 'set PORT=5000' in terminal)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
