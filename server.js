//import
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")

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
app.use("/static", express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

//route and routers
app.get("/", (req, res) => {
    res.send("Yep, it's working")
})

//start the server
const PORT= process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening to this port ${PORT}`))