const squareConnect = require('square-connect');
const { title } = require('process');
const crypto = require('crypto');
const dotenv = require('dotenv');
const { request } = require('express');
const express = require('express');
const router = express.Router();


// Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
const accessToken = process.env.ACCESS_TOKEN
oauth2.accessToken = accessToken;

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = 'https://connect.squareupsandbox.com';

router.post('/process-payment', async (req, res) => {
  console.log(req.cookies)
  const request_params = req.body;
  console.log ("65  request_params:", request_params)
  console.log(req.sessionStore)

  // length of idempotency_key should be less than 45
  const idempotency_key = crypto.randomBytes(22).toString('hex');

  // Charge the customer's card
  const payments_api = new squareConnect.PaymentsApi();
  const request_body = {
    source_id: request_params.nonce,
    amount_money: {
      amount: request_params.fee, //  charge
      currency: 'CAD'
    },
    idempotency_key: idempotency_key
  };
  try {
    const response = await payments_api.createPayment(request_body);
    res.status(200).json({
      'title': 'Payment Successful',
      'result': response,
      
    });
  
  } 
  catch(error) {
    res.status(500).json({
      'title': 'Payment Failure',
      'result': error.response
    });
  }
  
});
module.exports = router;