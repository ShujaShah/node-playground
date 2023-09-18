const express = require('express');
const morgan = require('morgan');

const CoursesRouter = require('./routes/courses');
const GenresRouter = require('./routes/genres');
const HomeRouter = require('./routes/home');

var app = express();
app.use(morgan('tiny'));
app.use(express.json());

app.use('/', HomeRouter);
app.use('/api/course', CoursesRouter);
app.use('/api/genres', GenresRouter);

app.listen(6000, () => {
  console.log('Connected to port 6000');
});
