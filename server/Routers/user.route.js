const userController = require('../controllers/user.controller')
const checkRegister = require('../middleware/checkRegister')

const userRoute = (app) =>{
    app.get("/users",userController.getUsers)
    app.post("/login",userController.Login)
    app.post("/register",checkRegister,userController.Register)
    app.put("/usersActive/:id",userController.updateStatusUser)
}

module.exports = userRoute