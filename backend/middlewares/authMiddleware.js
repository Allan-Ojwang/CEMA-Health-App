import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired, please log in again" });
    }
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authenticateUser;
