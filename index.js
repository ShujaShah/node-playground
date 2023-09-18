const express = require('express');
const CoursesRouter = require('./routes/courses');
const HomeRouter = require('./routes/home');

var app = express();

app.use(express.json());
app.use('/api/course', CoursesRouter);
app.use('/', HomeRouter);

app.listen(6000, () => {
  console.log('Connected to port 6000');
});
