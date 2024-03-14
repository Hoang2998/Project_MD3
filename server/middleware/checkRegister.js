const userServices = require("../service/user.services")

const checkRegister = async(req, res, next) => {
    const { username, email, password} = req.body
    // console.log(username, email, password)
    if (username && email && password  ) {
        const checkEmail = await userServices.checkEmail(email)
        if (checkEmail[0][0]) {
            console.log("111111")
            return res.status(400).json({ message: 'Email already exists' })
        }
        next()
    } else {
        res.status(400).json({ message: 'Please fill in all fields' })
}
}
module.exports = checkRegister