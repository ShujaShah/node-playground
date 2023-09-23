const express = require('express');
const {
  GetCustomer,
  GetCustomers,
  CreateCustomer,
  DeleteCustomer,
  UpdateCustomer,
} = require('../controllers/customers-controller');
const router = express.Router();

//Get all customers
router.get('/', GetCustomers);

//Create a Customer
router.post('/', CreateCustomer);

//Update Customer
router.put('/:id', UpdateCustomer);

//Deleting a Customer
router.delete('/:id', DeleteCustomer);

// Getting a Single Customer
router.get('/:id', GetCustomer);

module.exports = router;
