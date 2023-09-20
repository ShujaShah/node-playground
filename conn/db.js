const mongoose = require('mongoose');
mongoose
  .connect('mongodb+srv://shuja:shuja@cluster0.dn2hzu3.mongodb.net/playground')
  .then(() => console.log('Connected to the Database...'))
  .catch((err) => console.log('Error connecting to the database', err));
