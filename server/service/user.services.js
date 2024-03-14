const data = require("../config/db.config.js")
const bcrypt = require("bcryptjs")

const userServices = {
    getUser:(req,res)=>{
        try {
            const users = data.execute("SELECT * FROM users where role = 0")
            return users
        } catch (error) {
            return error
        }
    },
    createUser: (nameuser,email,password)=>{
        try {
            const result =data.execute("INSERT INTO users (nameUser, email, passwords) VALUES (?,?,?)",[nameuser,email,password])
            return result
        } catch (error) {
            return error
        }
    },
    checkEmail:(email)=>{
        try {
            const result = data.execute("SELECT * FROM users WHERE email = ?",[email])
            return result
        } catch (error) {
            return error
        }
    },

    checkLogin:async(email,password)=>{
        try {
           
            const result = await data.execute("SELECT * FROM `users` WHERE email = ?",[email])
            // console.log(result[0][0].passwords)
         
            if(result[0][0]){
                const checkPassword = await bcrypt.compare(password,result[0][0].passwords);
                if(checkPassword){
                    return result[0][0]
                }
                return false
            }
            return false
        } catch (error) {
            return error
        }
    },
  updateStatusUser:async(active,id)=>{
      try {
        const result = await data.execute("UPDATE users SET active = ? WHERE idUser = ?",[active,id])
        return result
      } catch (error) {
        return error
      }
  }
}

module.exports = userServices