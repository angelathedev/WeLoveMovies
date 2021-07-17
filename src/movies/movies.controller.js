const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

  async function list(req, res) {
    const { is_showing } = req.query;
    let data;
    if (is_showing === "true") {
      data = await service.listOfShowing();
    } else {
      data = await service.list();
    }
    res.json({ data });
  }
  
  async function movieExists(req, res, next) {
    const { movieId } = req.params;
  
    const movie = await service.read(Number(movieId));
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    return next({
      status: 404,
      message: "the ID given does not match any ID in the database",
    });
  }
  
  async function read(req, res) {
    res.json({ data: res.locals.movie });
  }
  
  async function reviewsByMovieId(req, res) {
    const { movieId } = req.params;
    const data = await service.reviewsByMovieId(Number(movieId));
    res.json({ data });
  }
  
  module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), read],
    reviewsByMovieId: [asyncErrorBoundary(reviewsByMovieId)],
  };