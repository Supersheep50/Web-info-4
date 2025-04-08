const express = require('express');
const cors = require('cors');
const app = express();
const port = 5050;

// ✅ Ensure DB connects
require('./db');

// ✅ Apply proper CORS headers
app.use(cors({
  origin: 'http://localhost:3000',  // React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: false // set to true only if you use cookies
}));

app.use(express.json());

// ✅ Logging requests
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

// ✅ Load routes
const therapistRoutes = require('./routes/therapists');
app.use('/api/therapists', therapistRoutes);

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
