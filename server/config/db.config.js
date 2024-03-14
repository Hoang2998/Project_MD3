const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection:', err.message);
      return;
    }
  
    console.log('Connected to MySQL database!');
  
    // Kiểm tra trạng thái kết nối
    console.log('Connection status:', connection.state);
  
    // Thực hiện công việc của bạn ở đây
  
    // Giải phóng kết nối khi đã sử dụng xong
    connection.release();
  });

const database = pool.promise()
module.exports = database