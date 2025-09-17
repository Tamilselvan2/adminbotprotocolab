const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { startEscalationService } = require('./services/escalationService');

dotenv.config();

connectDB();

startEscalationService();

const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/grievances', require('./routes/grievances'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
