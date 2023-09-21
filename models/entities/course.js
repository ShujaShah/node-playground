const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://shuja:shuja@cluster0.dn2hzu3.mongodb.net/?retryWrites=true&w=majority&ssl=true'
  )
  .then(() => console.log('Connected to the Database...'))
  .catch((err) => console.log('Error connecting the database', err));
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  data: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Redux',
    author: 'Shah',
    tags: ['frontend', 'redux'],
    isPublished: true,
  });

  const result = await course.save();

  console.log(result);
}

//createCourse();

// async function getCourses() {
//   const result = await Course.find({
//     author: 'Shuja',
//     // author: /^Shuja/   //starts with Shuja
//     // author: /Shah$/i   // ends with Shah
//     // author: /.*Shuja.*/ // contains Shuja
//   })
//     .skip()
//     .limit(10)
//     .select({ name: 1, tags: 1 }); //returns all the courses
//   //.count()  // to get the no. of documents
//   console.log(result);
// }
// getCourses();

// Exercise
// get all the published backend courses
// Sort them by their name
// Pick only their name and author
// display them

async function getBackEndCourses() {
  const result = await Course.find({
    tags: 'backend', // choosing only backend courses
  })
    .select({ name: 1, author: 1 }) // selecting only name and author
    .sort({ name: 1 }); // sorting in ascending order
  console.log(result);
}

//getBackEndCourses();

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.set({
    isPublished: false,
    author: 'Shuja Ashraf',
  });
  const result = await course.save();
  console.log(result);
}

updateCourse('650a9bfd98a2740479da91fa');
