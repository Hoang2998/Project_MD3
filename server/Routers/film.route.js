const filmController = require("../controllers/film.controller")
const { checkAdmin } = require("../middleware/checkAdmin")
const { verifyToken } = require("../middleware/jwtverify")

const filmRoute = (app) =>{
    app.get("/category",filmController.getCategoryFilm)
    app.post("/addCategory",checkAdmin,filmController.addCategory)
    app.get("/films",filmController.getFilms)
    app.post("/addFilm",checkAdmin,filmController.addFilm)
    app.delete("/deleteFilm/:id",checkAdmin,filmController.deleteFilm)
    app.get("/getfilmUpdate/:id",filmController.getFilmUpdate)
    app.put("/editfilm/:id",filmController.editfilm)
    app.get("/getCategoryForFilms",filmController.getCategoryForFilms)
    app.post("/addCategoryForFilm",filmController.addCategoryForFilm)
    app.get("/getCategoryForFilmUpdate",filmController.getCategoryForFilmUpdate)
    app.put("/editCategoryFilmUpdate/:id",checkAdmin,filmController.editCategoryFilmUpdate)
    app.get("/filmComing",filmController.getFilmComing)
    app.get("/filmNowShowing",filmController.getFilmNowShowing)
    app.get("/getfilmForDay",filmController.getDayForFilm)
    app.get("/getfilmBuyTicket",verifyToken,filmController.getfilmBuyTicket)
    app.get("/getChair",filmController.getChair)
}

module.exports = filmRoute

