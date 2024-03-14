const { sendEmail } = require("../controllers/email.controller")


const emailRouter = (app) =>{
   app.post("/sendEmail",sendEmail) 
}
module.exports = emailRouter