const express = require('express');
const Joi = require('joi');

var app = express();
app.use(express.json());

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Adventure' },
  { id: 4, name: 'Fiction' },
];

//Get All Genres
app.get('/api/genres', (req, res) => {
  res.status(201).send(genres);
});

//Create a Genre
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.status(201).send(genre);
});

//Updating a Genre
app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre with the given id not found');
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  genre.name = req.body.name;
  res.status(201).send(genre);
});

//deleting a genre
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre with the given id not found');
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.status(201).send(genre);
});

//Defining the validation
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

app.listen(6000, () => {
  console.log('Listening on Port 6000');
});
