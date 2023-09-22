const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const router = express.Router();

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
  },
});

const Genre = mongoose.model('Genre', genreSchema);

//Get All Genres
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.status(201).send(genres);
});

//Create a Genre
router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.status(201).send(genre);
});

//Updating a Genre
router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send('Genre with the given id not found');
  res.status(201).send(genre);
});

//Deleting a Genre
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('Genre with the given id not found');
  res.status(201).send(genre);
});

//Getting a single Genre
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('Genre with the given id not found');
  res.status(201).send(genre);
});

//Defining the validation
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

module.exports = router;
