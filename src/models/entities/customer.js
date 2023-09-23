const mongoose = require('mongoose');
const Joi = require('joi');

const CustomerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    lowercase: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  phone: {
    type: Number,
  },
  isGold: {
    type: Boolean,
  },
});

const Customer = mongoose.model('Customer', CustomerSchema);

//Defining the validation
function validateCustomer(customer) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } })
      .min(5)
      .required(),
    name: Joi.string().min(3).required(),
    phone: Joi.number().min(6),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

module.exports = { Customer, validateCustomer };
