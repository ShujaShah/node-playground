const express = require('express');
const { Genre, validateGenre } = require('../models/entities/genre');

//Get All Genres
const GetGenres = async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.status(201).send(genres);
};

//Create a Genre
const CreateGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.status(201).send(genre);
};

//Updating a Genre
const UpdateGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send('Genre with the given id not found');
  res.status(201).send(genre);
};

//Deleting a Genre
const DeleteGenre = async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('Genre with the given id not found');
  res.status(201).send(genre);
};

//Getting a single Genre
const GetGenre = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre)
      return res.status(404).send('Genre with the given id not found');
    res.status(201).send(genre);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  GetGenre,
  GetGenres,
  CreateGenre,
  UpdateGenre,
  DeleteGenre,
};
