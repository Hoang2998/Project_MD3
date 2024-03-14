const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const rootRouter = require('./Routers/root.route')
require('dotenv').config()

rootRouter(app)

app.listen(process.env.PORT || 8080, () => console.log(`Dang chay tren cong ${process.env.PORT || 8080}`))