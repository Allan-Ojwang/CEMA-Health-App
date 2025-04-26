import express, { json } from "express";
const app = express();
import clientRoutes from "./routes/clientRoutes";
import authRoutes from "./routes/authRoutes";
import programRoutes from "./routes/programRoutes";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

// Middleware
app.use(json());

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000");
});
