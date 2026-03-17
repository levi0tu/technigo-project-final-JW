import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project"
mongoose.connect(mongoUrl)
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
// http://localhost:8080/
app.get("/", (req, res) => {
  res.send("Växla Upp API")
})
app.post("/register", (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ message: "Alla fält måste fyllas i" })
    return
  }
  res.json({
    message: "Användare registrerad",
    user: {
      name,
      email,
      password,
    },
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})