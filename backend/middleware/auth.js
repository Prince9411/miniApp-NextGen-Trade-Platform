const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Get token from header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // store payload info (userId, email) in req.user
    next(); // move to next middleware/route
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
}

module.exports = authenticateToken;
