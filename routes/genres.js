const express = require('express');
const router = express.Router();

const {
  GetGenre,
  GetGenres,
  CreateGenre,
  UpdateGenre,
  DeleteGenre,
} = require('../controllers/genres-controller');

//Get All Genres
router.get('/', GetGenres);

//Create a Genre
router.post('/', CreateGenre);

//Updating a Genre
router.put('/:id', UpdateGenre);

//Deleting a Genre
router.delete('/:id', DeleteGenre);

//Getting a single Genre
router.get('/:id', GetGenre);

module.exports = router;
