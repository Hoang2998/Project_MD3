const userServices = require("../service/user.services");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const userController = {

    getUsers: async(req, res) => {
        try {
            const user =  await userServices.getUser()
            console.log(user[0])
            res.status(200).json({
                message:"success",
                data:user[0]
            })
        } catch (error) {
            res.status(400).json({message:"fail"})
        }
         
    },
    Login: async(req, res) => {
        const {email, password} = req.body
        if(email == "" || password == ""){
          return  res.status(400).json({message:"Bạn phải điền đầy đủ thông tin !!!"})
        }
        
        try {
            const result = await userServices.checkLogin(email, password)
            console.log(result)
            if(result){
                if (result.active == 0) {
                    return res.status(400).json({message:"Tài khoản đang bị khoá !!!"})
                }
                const token = jwt.sign({
                    name:result.nameUser,
                    id:result.idUser,
                    email:result.email,
                    role:result.role
                }, process.env.SECRET_KEY)
                return  res.status(200).json({
                    message:"login success",
                    data:result,
                    token
                })
            }
            return res.status(400).json({message:"Email hoặc mật khẩu sai"})
        } catch (error) {
            res.status(500).json({message:"error server"})
        }
    },
    Register: (req, res) => {
        const {username, email, password} = req.body
       try {
            const result = userServices.createUser(username, email, password)
            res.status(201).json({message:"create success"})
       } catch (error) {
        res.status(400).json({message:"fail"})
       }
    },
    updateStatusUser: async(req, res) =>{
        const {id} = req.params
        const {active} = req.body   
        console.log(id,active)
        try {
            const result = await userServices.updateStatusUser(active, id)
            const result2 = await userServices.getUser()
            res.status(200).json({message:"success",data:result2})
        } catch (error) {
            res.status(400).json({message:"server error"})
        }
    }
}

module.exports = userController
