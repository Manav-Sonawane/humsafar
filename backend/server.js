const express = require("express")
const cors = require("cors")
const generateTrip = require("./routes/generateTrip")


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/trip", generateTrip)

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000")
})