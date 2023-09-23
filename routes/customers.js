const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const router = express.Router();

const CustomerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    lowercase: true,
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

//Get all customers
router.get('/', async (req, res) => {
  const customer = await Customer.find();
  if (!customer) return res.status('400').send('No customer added...');
  res.status(201).send(customer);
});

//Create a Customer
router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.status(201).send(customer);
});

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

module.exports = router;
