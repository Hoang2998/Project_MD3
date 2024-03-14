const data = require("../config/db.config.js")

const filmServices = {
    getCategory: () =>{
        try {
            const result = data.execute("SELECT * FROM categoryfilm")
            return result
        } catch (error) {
            return error
        }
    },
    addCategory: (name) =>{
        try {
            const result = data.execute("INSERT INTO categoryfilm(name) VALUES (?)",[name])
            return result
        } catch (error) {
            return error
        }
    },
    getFilmsSetup: () =>{
        try {
            
            const result = data.execute("SELECT * FROM films JOIN categoryfilm ON films.category = categoryfilm.idCategory ")
            return result
        } catch (error) {
            return error
        }
    },
    getCategoryForFilms: async() =>{
        try {
            const result = await data.execute("SELECT * FROM films JOIN categorysforfilm JOIN categoryfilm ON films.idFilm = categorysforfilm.idFilm AND categoryfilm.idCategory = categorysforfilm.idCategory")
            // console.log("1111111111111111111111",result[0][0])
            return result[0]
        } catch (error) {
            return error
        }
    },
    getFilms: async() =>{
        try {
            const result = await data.execute("SELECT * FROM films ")
            // console.log(result)
            return result
        } catch (error) {
            return error
        }
    },

    checkNewFilm: (name) =>{
        try {
            const result = data.execute("SELECT * FROM films WHERE nameFilm = ?",[name])
            return result
        } catch (error) {
            return error
        }
    },
    addFilm: (name, duration, date, img, filmDetail, trailer) =>{
        try {
            const result = data.execute("INSERT INTO films(nameFilm, duration, releaseDate, imageFilm,detailFilm, trailer) VALUES (?,?,?,?,?,?)",[name, duration, date, img, filmDetail, trailer])
            return result
        } catch (error) {
            return error
        }
    },
    deleteFilm: (id) =>{
        try {
            const result = data.execute("DELETE FROM films WHERE idFilm = ?",[id])
            return result
        } catch (error) {
            return error
        }
        
    },
    getFilmUpdate: (id) =>{
        try {
            const result = data.execute("SELECT * FROM films  WHERE idFilm = ?",[id])
            return result
        } catch (error) {
            return error
        }
    },
    editfilm:(id, name, duration, date, img, filmDetail, trailer, category) =>{
        try {
            const result = data.execute("UPDATE films SET nameFilm = ?, duration = ?, releaseDate = ?, imageFilm = ?, detailFilm = ?, trailer = ? WHERE idFilm = ?",[name, duration, date, img, filmDetail, trailer, id])
            return result
        } catch (error) {
            return error
        }
    },
    addCategoryForFilm:(idFilm, idCategory) =>{
        try {
            const result = data.execute("INSERT INTO categorysforfilm(idFilm, idCategory) VALUES (?,?)",[idFilm, idCategory])
            return result
        } catch (error) {
            return error
        }
    },
    getCategoryForFilmUpdate: (id) =>{
       try {
        const result = data.execute("SELECT categoryfilm.idCategory FROM films JOIN categorysforfilm JOIN categoryfilm ON films.idFilm = categorysforfilm.idFilm AND categoryfilm.idCategory = categorysforfilm.idCategory WHERE films.idFilm = ?",[id])
        return result
       } catch (error) {
        return error
       }
    },
    deleteCategoryFilm: (id) =>{
        try {
            const result = data.execute("DELETE FROM categorysforfilm WHERE idFilm = ?",[id])
            return result
        } catch (error) {
            return error
        }
    },
    editCategoryFilmUpdate: (id, category) =>{
        try {
            const result = data.execute("UPDATE categorysforfilm SET idCategory = ? WHERE idFilm = ?",[category, id])
            return result
        } catch (error) {
            return error
        }
    },
    getFilmsForDay:()=>{
        try {
            const result = data.execute("SELECT * FROM films JOIN adminshowtime  ON adminshowtime.idFilm = films.idFilm")
            return result
        } catch (error) {
            return error
        }
    },
    getFilmBuyTicket:(idFilm)=>{
        try {
            const result  = data.execute("SELECT * FROM films JOIN adminshowtime JOIN showtime JOIN room ON adminshowtime.idFilm = films.idFilm AND adminshowtime.idShowTime = showtime.idTime AND adminshowtime.idRoom = room.idRoom WHERE films.idFilm = ?",[idFilm])
            return result
        } catch (error) {
            return error
        }
    },
    getChair:()=>{
        try {
            const result = data.execute("SELECT * FROM chair")
            return result
        } catch (error) {
            return error
        }
    }
    

}

module.exports = filmServices