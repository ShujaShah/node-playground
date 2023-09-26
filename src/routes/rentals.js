const express = require('express');

const {
  GetRentals,
  CreateRental,
  DeleteRental,
  GetRental,
} = require('../controllers/rental-controller');

const router = express.Router();

//Getting all the rentals
router.get('/', GetRentals);

//Creating a Rental
router.post('/', CreateRental);

//Deleting the Rental
router.delete('/:id', DeleteRental);

//Getting a Single Rental
router.get('/:id', GetRental);
module.exports = router;
