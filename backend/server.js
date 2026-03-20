import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { User } from "./models/User.js"
import { Debt } from "./models/Debt.js"
import { Payment } from "./models/Payment.js"
import { Lesson } from "./models/Lesson.js"

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

app.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: "E-post och lösenord krävs" })
    return
  }

  const user = await User.findOne({ email })

  if (!user) {
    res.status(404).json({ message: "Användaren finns inte" })
    return
  }
  if (user.password !== password) {
    res.status(401).json({ message: "Fel lösenord" })
    return
  }
  res.json({
    message: "Inloggning lyckades",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  })
})

app.post("/debts", async (req, res) => {
  const { userId, name, totalAmount, monthlyPayment, interestRate } = req.body

  if (!name || !totalAmount || !monthlyPayment || !interestRate) {
    res.status(404).json({ message: "Alla fält måste fyllas i" })
    return
  }

  const newDebt = new Debt({
    userId,
    name,
    totalAmount,
    monthlyPayment,
    interestRate,
  })

  await newDebt.save()

  res.status(201).json(newDebt)
})

app.get("/debts", async (req, res) => {
  const { userId } = req.query

  const debts = userId
    ? await Debt.find({ userId })
    : await Debt.find()

  res.json(debts)
})

app.get("/debts/:id", async (req, res) => {
  const debt = await Debt.findById(req.params.id)
  res.json(debt)
})

app.post("/payments", async (req, res) => {
  const { debtId, amount, paymentDate } = req.body

  if (!debtId || !amount || !paymentDate) {
    res.status(400).json({ message: "Alla betalningsfält måste fyllas i" })
    return
  }
  const newPayment = new Payment({
    debtId,
    amount,
    paymentDate
  })

  await newPayment.save()

  res.status(201).json(newPayment)
})

app.get("/payments/:debtId", async (req, res) => {
  const payments = await Payment.find({ debtId: req.params.debtId })
  res.json(payments)
})

app.get("/dashboard", async (req, res) => {
  const { userId } = req.query
  const debtCount = await Debt.countDocuments({ userId })
  const userDebts = await Debt.find({ userId })
  const debtIds = userDebts.map((debt) => debt._id)
  const paymentCount = await Payment.countDocuments({ debtId: { $in: debtIds } })

  res.json({
    debtCount,
    paymentCount,
  })
})

app.get("/lessons", async (req, res) => {
  const lessons = await Lesson.find()
  res.json(lessons)
})

app.post("/lessons", async (req, res) => {
  const { title, content } = req.body
  const newLesson = new Lesson({
    title,
    content,
  })

  await newLesson.save()

  res.status(201).json(newLesson)
})

app.patch("/debts/:id", async (req, res) => {
  const updatedDebt = await Debt.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.json(updatedDebt)
})

app.delete("/debts/:id", async (req, res) => {
  await Debt.findByIdAndDelete(req.params.id)
  res.json({ message: "Skulden har tagits bort" })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})