const { getAll, create, getOne, remove, update, setMoviesGenres, setMoviesActors, setMoviesDirectors } = require('../controllers/movies.controller');
const express = require('express');

const moviesRouter = express.Router();

moviesRouter.route('/')
    .get(getAll)
    .post(create);

moviesRouter.route('/:id/genres')
    .post(setMoviesGenres)

moviesRouter.route('/:id/actors')
    .post(setMoviesActors)

moviesRouter.route('/:id/actors')
    .post(setMoviesDirectors)

moviesRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = moviesRouter;