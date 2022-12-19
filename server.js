//import
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const path = require('path')

//create express app
const app = express()

//establish mongoose connection
mongoose.connect(process.env.MONGO)

//mongoose connection messages
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected to Mongo"))
.on("error", (error) => console.log(error))

//register middleware
app.use(morgan("dev"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
// app.use(bodyparser.urlencoded({extended:true}))

//setting view engine
app.set("view engine", "ejs")

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//route and routers
app.get("/", (req, res) => {
    res.render('index');
})

//start the server
const PORT= process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening to this port ${PORT}`))