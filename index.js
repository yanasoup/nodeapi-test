const express = require('express');

const bodyParser = require('body-parser');

const midtransRoutes = require('./routes/midtrans');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Vercel!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
