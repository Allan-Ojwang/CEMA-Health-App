const express = require('express');
const app = express();
const clientRoutes = require('./routes/clientRoutes');

// Middleware
app.use(express.json());

// Routes
app.use(clientRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
