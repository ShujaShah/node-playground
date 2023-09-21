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
    name: 'React',
    author: 'Shuja',
    tags: ['Frontend', 'Javascript'],
    isPublished: true,
  });

  const result = await course.save();

  console.log(result);
}

//createCourse();

async function getCourses() {
  const result = await Course.find({
    author: 'Shuja',
    // author: /^Shuja/   //starts with Shuja
    // author: /Shah$/i   // ends with Shah
    // author: /.*Shuja.*/ // contains Shuja
  })
    .limit(10)
    .select({ name: 1, tags: 1 }); //returns all the courses
  console.log(result);
}
getCourses();
