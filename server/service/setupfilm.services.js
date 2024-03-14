const db = require("../config/db.config.js")

const setupFilmServices ={
    getDayShowFilm: async (id) => {
        try {
            const result = await db.execute("SELECT * FROM films WHERE idFilm = ?",[id])
            return result
        } catch (error) {
            return error
        }
    },
    getRoom: async () => {
        try {
            const result = await db.execute("SELECT * FROM room")
            return result
        } catch (error) {
            return error
        }
    },
    getShowTime: async () => {
        try {
            const result = await db.execute("SELECT * FROM showtime")
            return result
        } catch (error) {
            return error
        }
    },
    addShowTime: async (arr) => {
        // console.log(arr)
        const {idFilm, idRoom, date, showTime ,duration} = arr
        // console.log(idFilm, idRoom, date, showTime)
        try {
            const result = await db.execute("INSERT INTO adminshowtime (idFilm, idRoom, date_show, idShowTime ,duration) VALUES (?,?,?,?,?)",[idFilm, idRoom, date, showTime ,duration])
            return result
        } catch (error) {
            return error
        }
    },
    getAllDayShowTime: async () => {

        try {
            const result = await db.execute("SELECT * FROM adminshowtime join showtime on showtime.idTime = adminshowtime.idShowTime join room on room.idRoom = adminshowtime.idRoom join films on films.idFilm = adminshowtime.idFilm ORDER BY date_show" )
            return result
        } catch (error) {
            return error
        }
    },
    checkShowTime: async (room,date) => {
        try {
            const result = await db.execute("SELECT * FROM adminshowtime WHERE idRoom = ? AND date_show = ?",[room,date])
            return result
        } catch (error) {
            return error
        }
    },
    getFilmSetup: async (id) => {
        try {
            const result = await db.execute("SELECT * FROM films WHERE idFilm = ?",[id])
            return result
        } catch (error) {
            return error
        }
    },
    getFilmChoose: async () => {
        try {
            const result = await db.execute("SELECT * FROM films")
            return result
        } catch (error) {
            return error
        }
    }
}

module.exports = setupFilmServices