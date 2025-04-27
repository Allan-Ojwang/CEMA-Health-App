import express from "express";
import cors from "cors";  // Import the cors package
import './database/setupDB.js';
import clientRoutes from "./routes/clientRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

const app = express();

// Enable CORS for your frontend (localhost:5173)
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true,
};

// Apply the CORS middleware with the configured options
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000");
});
