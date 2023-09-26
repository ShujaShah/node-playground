const express = require('express');
const { Rental, validateRental } = require('../models/entities/rental');
const { Movie } = require('../models/entities/movie');
const { Customer } = require('../models/entities/customer');

const router = express.Router();

//Getting all the rentals
const GetRentals = async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.status(201).send(rentals);
};

//Creating a Rental
const CreateRental = async (req, res) => {
  const { error } = validateRental(req.body);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer)
    return res.status(404).send('Customer with the given id not found');

  const movie = await Movie.findById(req.body.movieId).populate('genre');
  if (!movie) return res.status(404).send('Movie with the given id not found');

  if (movie.numberInStock === 0)
    return res.status(400).send('Movie is out of stock');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre.name,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  rental = await rental.save();
  console.log(movie.genre.name);
  movie.numberInStock--;
  movie.save();

  res.status(201).send(rental);
};

//Deleting the Rental
const DeleteRental = async (req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);
  if (!rental)
    return res.status(404).send('Rental with the given id not found');
  res.status(201).send(rental);
};

//Getting a Single Rental
const GetRental = async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    return res.status(404).send('Rental with the given id not found');
  res.status(201).send(rental);
};
module.exports = {
  GetRentals,
  CreateRental,
  DeleteRental,
  GetRental,
};
