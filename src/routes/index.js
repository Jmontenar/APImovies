const express = require('express');
const genreRouter = require('./genre.routes.js');
const actorsRouter = require('./actors.routes.js')
const directorsRouter = require('./directors.routes.js')
const moviesRouter = require('./movies.routes.js')
const router = express.Router();

router.use("/genres", genreRouter )
router.use("/actors", actorsRouter)
router.use("/directors", directorsRouter)
router.use("/movies", moviesRouter)

module.exports = router;