import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { User } from "./models/User.js"
import { Debt } from "./models/Debt.js"
import { Payment } from "./models/Payment.js"
import { Lesson } from "./models/Lesson.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project"
mongoose.connect(mongoUrl)
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

const jwtSecret = process.env.JWT_SECRET

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Checks that the request includes a valid JWT and stores the user data in req.user
const authenticateUser = (req, res, next) => {
  const authHeader = req.header("Authorization")

  if (!authHeader) {
    res.status(401).json({ message: "Ingen token skickades med" })
    return
  }

  // The token is sent in the authorization header as: Bearer <token>
  const token = authHeader.replace("Bearer ", "")

  try {
    const decoded = jwt.verify(token, jwtSecret)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: "Ogiltig token" })
  }
}

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

    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    res.status(201).json({
      message: "Användare registrerad",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
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

  const isPasswordCorrect = bcrypt.compareSync(password, user.password)

  if (!isPasswordCorrect) {
    res.status(401).json({ message: "Fel lösenord" })
    return
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    jwtSecret, { expiresIn: "7d" }

  )
  res.json({
    message: "Inloggning lyckades",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  })
})

app.post("/debts", authenticateUser, async (req, res) => {
  const { name, totalAmount, monthlyPayment, interestRate } = req.body
  const userId = req.user.id

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

app.get("/debts", authenticateUser, async (req, res) => {
  const userId = req.user.id

  const debts = await Debt.find({ userId })

  const debtsWithPayments = await Promise.all(
    debts.map(async (debt) => {
      const payments = await Payment.find({ debtId: debt._id })
      const paidAmount = payments.reduce(
        (sum, payment) => sum + Number(payment.amount),
        0
      )

      return {
        ...debt.toObject(),
        paidAmount,
      }
    })
  )
  res.json(debtsWithPayments)
})

// Only return payments if the debt belongs to the logged-in user
app.get("/debts/:id", authenticateUser, async (req, res) => {
  const debt = await Debt.findOne({
    _id: req.params.id,
    userId: req.user.id,
  })

  if (!debt) {
    res.status(404).json({ message: "Skulden finns inte" })
    return
  }

  res.json(debt)
})

app.post("/payments", authenticateUser, async (req, res) => {
  const { debtId, amount, paymentDate } = req.body

  if (!debtId || !amount || !paymentDate) {
    res.status(400).json({ message: "Alla betalningsfält måste fyllas i" })
    return
  }

  // Make sure the payment is only added to a debt that belongs to the logged-in user
  const debt = await Debt.findOne({
    _id: debtId,
    userId: req.user.id,
  })

  if (!debt) {
    res.status(404).json({ message: "Skulden finns inte" })
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

app.get("/payments/:debtId", authenticateUser, async (req, res) => {
  const debt = await Debt.findOne({
    _id: req.params.debtId,
    userId: req.user.id,
  })

  if (!debt) {
    res.status(404).json({ message: "Skulden finns inte" })
    return
  }

  const payments = await Payment.find({ debtId: req.params.debtId })
  res.json(payments)
})

app.get("/dashboard", authenticateUser, async (req, res) => {
  const userId = req.user.id

  const debtCount = await Debt.countDocuments({ userId })
  const userDebts = await Debt.find({ userId })
  const totalDebtAmount = userDebts.reduce(
    (sum, debt) => sum + Number(debt.totalAmount),
    0
  )
  const debtIds = userDebts.map((debt) => debt._id)
  const paymentCount = await Payment.countDocuments({ debtId: { $in: debtIds } })

  res.json({
    debtCount,
    paymentCount,
    totalDebtAmount,
  })
})

app.get("/lessons", async (req, res) => {
  const lessons = await Lesson.find()
  res.json(lessons)
})

app.get("/me", authenticateUser, async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(404).json({ message: "Användaren finns inte" })
    return
  }

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
  })

})

// Only update the fields that were actually sent in the new request
app.patch("/debts/:id", authenticateUser, async (req, res) => {
  const { name, totalAmount, monthlyPayment, interestRate } = req.body

  const updatedFields = {}
  if (name !== undefined) updatedFields.name = name
  if (totalAmount !== undefined) updatedFields.totalAmount = totalAmount
  if (monthlyPayment !== undefined) updatedFields.monthlyPayment = monthlyPayment
  if (interestRate !== undefined) updatedFields.interestRate = interestRate


  const updatedDebt = await Debt.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user.id,
    },
    updatedFields,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!updatedDebt) {
    res.status(404).json({ message: "Skulden finns inte" })
    return
  }

  res.json(updatedDebt)
})

app.delete("/debts/:id", authenticateUser, async (req, res) => {
  const deletedDebt = await Debt.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  })

  if (!deletedDebt) {
    res.status(404).json({ message: "Skulden finns inte" })
    return
  }

  res.json({ message: "Skulden har tagits bort" })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})