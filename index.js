const express = require('express');

const bodyParser = require('body-parser');

const midtransRoutes = require('./routes/midtrans');

const app = express();

const dotenv = require('dotenv');
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to My Node API',
    env: process.env.NODE_ENV,
    apiUrl: process.env.API_URL,
  });
});
app.use('/midtrans', midtransRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

const PORT = process.env.PORT || 6433;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
