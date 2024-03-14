const filmRoute = require('./film.route')
const setupFilmRoute = require('./setupfilm.route')
const userRoute = require('./user.route')
const emailRouter = require('./email.route')
const ticketRoute = require('./ticket.route')
const rootRouter = (app) =>{
    userRoute(app)
    filmRoute(app)
    setupFilmRoute(app)
    emailRouter(app)
    ticketRoute(app)
}

module.exports = rootRouter