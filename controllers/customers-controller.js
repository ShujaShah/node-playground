const express = require('express');
const { Customer, validateCustomer } = require('../models/entities/customer');

//Get all customers
const GetCustomers = async (req, res) => {
  const customer = await Customer.find();
  if (!customer) return res.status('400').send('No customer added...');
  res.status(201).send(customer);
};

//Create a Customer
const CreateCustomer = async (req, res) => {
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
};

//Update Customer
const UpdateCustomer = async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  if (!customer)
    res.status(404).send('Customer with the given id not found...');
  res.status(201).send(customer);
};

//Deleting a Customer
const DeleteCustomer = async (req, res) => {
  let customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send('Customer with given id not found');
  res.status(201).send(customer);
};

// Getting a Single Customer
const GetCustomer = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send('Customer with Given id not found');
  res.status(201).send(customer);
};

module.exports = {
  GetCustomers,
  GetCustomer,
  CreateCustomer,
  UpdateCustomer,
  DeleteCustomer,
};
