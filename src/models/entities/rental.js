const Joi = require('joi');
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.string().required,
    movieId: Joi.string().required(),
  });
  return schema.validate(rental);
}

module.exports = {
  Rental,
  validateRental,
};
