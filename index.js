const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const HomeRouter = require('./routes/home');
const CoursesRouter = require('./routes/courses');
const CustomersRouter = require('./routes/customers');
const GenresRouter = require('./routes/genres');

var app = express();
app.use(express.json());
app.use(morgan('tiny'));

let mongo_url = process.env.MONGO_URL;
mongoose
  .connect(mongo_url)
  .then(() => console.log('Connected to the Database...'))
  .catch((err) => console.log('Error connecting the database', err));

app.use('/', HomeRouter);
app.use('/api/courses', CoursesRouter);
app.use('/api/customers', CustomersRouter);
app.use('/api/genres', GenresRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
