const express = require('express');
const Joi = require('joi');

var app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' },
];

app.get('/', (req, res) => {
  res.send('it works like a charm!');
});

// to get all the courses
app.get('/api/courses', (req, res) => {
  res.status(201).send(courses);
});

//to get the id through the route parameters
// app.get('/api/courses/:id/', (req, res) => {
//   res.send(req.params.id);
// });

//to get the posts with the given month and given year
app.get('/api/posts/:month/:year', (req, res) => {
  //res.send(req.params); //req.params sends all the params defined in the route
  res.send(req.query); // to sort by name use ?sortBy=name in url
});

//to get a single course
app.get('/api/courses/:id', (req, res) => {
  //1. Find the course with the given id matches the id given in the params.
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  //2. if course does not exist
  if (!course) {
    res.status(404).send('Course with the given id not found');
  }
  //3. else send the course
  res.send(course);
});

// to post a course
app.post('/api/courses', (req, res) => {
  //error handling with joi library
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  //1. set the structure of the course
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  //2. send the course to the array
  courses.push(course);
  //3. send the response back
  res.send(course);
});

//to get the query params
app.listen(6000, () => {
  console.log('Connected to port 6000');
});
