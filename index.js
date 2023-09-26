const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const HomeRouter = require('./src/routes/home');
const CustomersRouter = require('./src/routes/customers');
const GenresRouter = require('./src/routes/genres');
const MoviesRouter = require('./src/routes/movies');

var app = express();
app.use(express.json());
app.use(morgan('tiny'));

let mongo_url = process.env.MONGO_URL;
mongoose
  .connect(mongo_url)
  .then(() => console.log('Connected to the Database...'))
  .catch((err) => console.log('Error connecting the database', err));

app.use('/', HomeRouter);
app.use('/api/customers', CustomersRouter);
app.use('/api/genres', GenresRouter);
app.use('/api/movies', MoviesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
