const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {

  try {

    // GET TOKEN

    const authHeader = req.headers.authorization

    if (!authHeader) {

      return res.status(401).json({
        message: "No token provided",
      })
    }

    // EXTRACT TOKEN

    const token = authHeader.split(" ")[1]

    // VERIFY TOKEN

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    // STORE USER DATA

    req.user = decoded

    // CONTINUE

    next()

  } catch (error) {

    res.status(401).json({
      message: "Invalid token",
    })
  }
}

module.exports = authMiddleware