const express = require('express');
const courses = require('./routes/courses');

var app = express();

app.use(express.json());
app.use('/api/course', courses);

app.listen(6000, () => {
  console.log('Connected to port 6000');
});
