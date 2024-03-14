const { checkNewFilm } = require("../service/film.services")
const ticketServices = require("../service/ticket.services")

const ticketController = {
    getTickets: async(req, res) => {
        
        try {
            const result = await ticketServices.getTickets()
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    bookingTicket: async(req, res) => {
        const arr = req.body
        const {idChair,idRoom,idFilm,idUser,date,idShowTime,dateBuy,price} = arr
        console.log(idChair)
        const now = new Date(date).toISOString().split("T")[0]
        console.log(now)
        try {
            await Promise.all(idChair.map(async(item)=>{
                const result = await ticketServices.bookingTicket(idRoom,idFilm,idUser,now,idShowTime,dateBuy,price,item)
            }))
            res.status(200).json({ message: "success" })
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    checkTicket: async(req, res) => {
        const {idRoom,date,idShowTime} = req.query
        console.log(date)
        try {
            const result = await ticketServices.checkTicket(idRoom,idShowTime)
            let arr = []
            result[0].forEach(element => {
                if(element.date.split("-").join("") == date){
                    arr.push(element)
                }
            })
            // console.log(arr)
            res.status(200).json({ message: "success", data: arr })
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    getTicket: async(req, res) => {
        console.log("111111111111")   
      try {
        const result = await ticketServices.getTicket(req.user.id)
        console.log(req.user)
        res.status(200).json({ message: "success", data: result})
      } catch (error) {
        res.status(400).json({ message: "server error" })   
      }
    },
    getTicketDetail: async(req, res) => {
        const {idTicket} = req.query
        console.log(idTicket)
        try {
            const result = await ticketServices.getTicketDetail(idTicket)
            res.status(200).json({ message: "success", data: result})
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    }
}
module.exports = ticketController