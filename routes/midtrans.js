const express = require('express');
const midtransClient = require('midtrans-client');

const router = express.Router();

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-OE_e5FvqfBg5nl1IfcEO03I7',
});

router.post('/createToken', async (req, res, next) => {
  try {
    const params = req.body;
    console.log('params', params);
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
