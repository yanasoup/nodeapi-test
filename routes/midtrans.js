const express = require('express');
const midtransClient = require('midtrans-client');
const router = express.Router();
const dotenv = require('dotenv');
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.VITE_MIDTRANS_SERVER_KEY,
});

router.get('/', (req, res) => {
  res.json({
    message: 'midtrans API root!',
  });
});
router.get('/kotewalala', (req, res) => {
  res.json({
    message: process.env.VITE_MIDTRANS_SERVER_KEY,
  });
});

router.post('/createToken', async (req, res, next) => {
  try {
    const params = req.body;
    const parameters = {
      transaction_details: params.transaction_details,
      callbacks: params.callbacks,
    };
    const response = await snap.createTransaction(parameters);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
