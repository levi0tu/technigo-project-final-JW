import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { User } from "./models/User.js"

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
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ message: "Alla fält måste fyllas i" })
    return
  }

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      res.status(400).json({ message: "E-postadressen används redan" })
      return
    }

    const newUser = new User({
      name,
      email,
      password,
    })

    await newUser.save()

    res.status(201).json({
      message: "Användare registrerad",
      user: newUser,
    })
  } catch (error) {
    res.status(500).json({ message: "Något gick fel" })
  }
})

app.post("/login", (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: "E-post och lösenord krävs" })
    return
  }

  res.json({ message: "Inloggning lyckades" })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})