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
    name: 'NodeJS',
    author: 'Shuja',
    tags: ['node', 'backend'],
    isPublished: true,
  });

  const result = await course.save();

  console.log(result);
}

createCourse();
