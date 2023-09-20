const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const CoursesRouter = require('./routes/courses');
const GenresRouter = require('./routes/genres');
const HomeRouter = require('./routes/home');

var app = express();
app.use(morgan('tiny'));
app.use(express.json());

app.use('/', HomeRouter);
app.use('/api/course', CoursesRouter);
app.use('/api/genres', GenresRouter);

mongoose
  .connect('mongodb+srv://shuja:shuja@cluster0.dn2hzu3.mongodb.net/')
  .then(() => console.log('Connected to the Database...'))
  .catch((err) => console.log('Error connecting the database', err));

app.listen(6000, () => {
  console.log('Connected to port 6000');
});
