const data = require("../config/db.config.js")

const ticketServices = {
    getTickets: async() => {
        try {
            const result = await data.execute("SELECT * FROM tickets join users on tickets.idUser = users.idUser") 
        } catch (error) {
            return error
        }
    },
    bookingTicket: async(idRoom,idFilm,idUser,date,idShowTime,dateBuy,price,item) => {
        try {
            const result = await data.execute("INSERT INTO ticket (idRoom,idFilm,idUser,date,idShowTime,idChair,dateBuy,price) VALUES (?,?,?,?,?,?,?,?)",[idRoom,idFilm,idUser,date,idShowTime,item,dateBuy,price])
            return result
        } catch (error) {
            return error
        }
    },
    checkTicket: async(idRoom,idShowTime) => {
        try {
            // console.log(idRoom,idShowTime,"11111")
            const result = await data.execute("SELECT * FROM ticket WHERE idRoom = ? AND idShowTime = ?",[idRoom,idShowTime])
            return result
        } catch (error) {
            return error
        }
    },
    getTicket: async(id) => {
        try {
            console.log(id)
            const result = await data.execute("SELECT * FROM ticket WHERE idUser = ?",[id])
            return result
        } catch (error) {
            return error
        }
    },
    getTicketDetail: async(id) => {
        try {
            const result = await data.execute("SELECT * FROM ticket join users join films join room join showtime on ticket.idUser = users.idUser  and ticket.idFilm = films.idFilm and ticket.idRoom = room.idRoom and ticket.idShowTime = showtime.idTime WHERE idTicket = ?",[id])
            return result
        } catch (error) {
            return error
        }
    }
    
}

module.exports = ticketServices