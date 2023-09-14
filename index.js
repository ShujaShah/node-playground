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
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
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

app.put('/api/courses/:id', (req, res) => {
  //find the course if it exists
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(400).send('course with the given id doesnot exits');
  }
  //validate the request
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  //update the course
  course.name = req.body.name;
  //return the updated course
  res.send(course);
});

//delete the Course
app.delete('/api/courses/:id', (req, res) => {
  //find the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('Course with the given id not found');
  //delete the course
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  //return the same course
  res.send(course);
});

//validation
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

app.listen(6000, () => {
  console.log('Connected to port 6000');
});
