const ticketController = require("../controllers/ticket.controller")
const { verifyToken } = require("../middleware/jwtverify")

const ticketRoute = (app) =>{
    app.get("/tickets",ticketController.getTickets)
    app.post("/bookingTicket",ticketController.bookingTicket)
    app.get("/checkTicket",ticketController.checkTicket)
    app.get("/getTickets",verifyToken,ticketController.getTicket)
    app.get("/getTicketDetail",ticketController.getTicketDetail)
}
module.exports = ticketRoute