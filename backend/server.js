const express = require('express');
const cors = require('cors');
const app = express();
const port = 5050;


require('./db');


app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: false 
}));

app.use(express.json());


app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});


const therapistRoutes = require('./routes/therapists');
app.use('/api/therapists', therapistRoutes);

const clientRoutes = require('./routes/clients');
app.use('/api/clients', clientRoutes);

const sessionsRouter = require('./routes/sessions');
app.use('/api/sessions', sessionsRouter);


app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
