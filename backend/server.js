const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const connectDB = require("./config/db")

const goalRoutes = require("./routes/goalRoutes")

const authRoutes = require("./routes/authRoutes")

// Load Environment Variables

dotenv.config()

// Connect Database

connectDB()

const app = express()

// Middleware

app.use(cors())
app.use(express.json())
app.use("/api/goals", goalRoutes)
app.use("/api/auth", authRoutes)
// Test Route

app.get("/", (req, res) => {
  res.send("Placement War-Room Backend Running")
})

// Server Port

const PORT = process.env.PORT || 5000

// Start Server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})