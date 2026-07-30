const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const connectDB = require("./config/db")

const goalRoutes = require("./routes/goalRoutes")

const authRoutes = require("./routes/authRoutes")

const dsaRoutes = require("./routes/dsaRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

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
app.use("/api/dsa", dsaRoutes)
app.use("/api/dashboard", dashboardRoutes)
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