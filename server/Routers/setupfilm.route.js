const filmController = require("../controllers/film.controller")
const setupFilmController = require("../controllers/setupfilm.controller")

const setupFilmRoute = (app) =>{
    app.get("/getDayShowFilm/:id",setupFilmController.getDayShowFilm)
    app.get("/getRoom",setupFilmController.getRoom)
    app.get("/getShowTime",setupFilmController.getShowTime)
    app.post("/addShowTime",setupFilmController.addShowTime)
    app.get("/getAllDayShowTime",setupFilmController.getAllDayShowTime)
    app.post("/checkShowTime",setupFilmController.checkShowTime)
    app.get("/FilmsSetup",filmController.getFilmsSetup)
    app.get("/getFilmSetup/:id",setupFilmController.getFilmSetup)
    app.get("/getFilmChoose",setupFilmController.getFilmChoose)
}

module.exports = setupFilmRoute