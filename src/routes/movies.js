const express = require('express');
const router = express.Router();

const {
  GetMovie,
  GetMovies,
  CreateMovie,
  UpdateMovie,
  DeleteMovie,
} = require('../controllers/movies-controller');

//Get All Movies
router.get('/', GetMovies);

//Create a Movie
router.post('/', CreateMovie);

//Updating a Movie
router.put('/:id', UpdateMovie);

//Deleting a Movie
router.delete('/:id', DeleteMovie);

//Getting a single Movie
router.get('/:id', GetMovie);

module.exports = router;
