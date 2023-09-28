const express = require('express');
const { Rental, validateRental } = require('../models/entities/rental');
const { Movie } = require('../models/entities/movie');
const { Customer } = require('../models/entities/customer');

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

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send('Movie with the given id not found');

  if (movie.numberInStock === 0)
    return res.status(400).send('Movie is out of stock');
  let rental = new Rental({
    customer: customer.id,
    movie: movie.id,
  });
  rental = await rental.save();
  movie.numberInStock--;
  movie.save();
  //populate the customer and rental:
  rental = await (
    await rental.populate('customer', 'name')
  ).populate('movie', 'title, genre');
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
