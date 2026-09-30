function createResponse(status = 200, message = 'Success') {
  return {
    status,
    message,
  };
}

function buildMoviePayload(req) {
  const body = req && req.body ? req.body : {};

  return {
    title: body.title,
    genre: Array.isArray(body.genre) ? body.genre : [body.genre].filter(Boolean),
    year: Number.parseInt(body.year, 10),
    duration: Number.parseInt(body.duration, 10),
    location: body.location,
    actors: Array.isArray(body.actors)
      ? body.actors.map((actor) => ({
          name: actor && actor.name ? actor.name : 'No Name',
        }))
      : [],
  };
}

module.exports = {
  createResponse,
  buildMoviePayload,
};
