const jwt = require("jsonwebtoken");
require("dotenv").config();
const checkAdmin = (req, res, next) => {
    try {
      // Lấy token
      const token = req.headers.authorization?.split(" ")[1];
      console.log(token,"111111")
      if (!token) {
        return res.status(401).json({ message: "Không tìm thấy token" });
      }
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
        //   if (err.name === "TokenExpiredError") {
        //     // Nếu token đã hết hạn
        //     return res.status(401).json({ message: "Token đã hết hạn" });
        //   }else{
            // Nếu token không hợp lệ
            return res.status(403).json({ message: "You need to login" });
        //   }
        }
        if(decoded.role == 1){
          req.user = decoded;
          next();
        }else{
          return res.status(403).json({ message: "You don't have permission" });
        }
        
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    checkAdmin
}