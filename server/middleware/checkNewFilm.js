const filmServices = require("../service/film.services")

const checkNewFilm = async(req, res, next) => {
    const{name} = req.body
    try {
        const result = await filmServices.checkNewFilm(name)
        console.log(result)
        next()
    } catch (error) {
        res.status(400).json({ message: "server error" })
    }    
}
module.exports = checkNewFilm