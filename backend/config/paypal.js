import * as paypal from "@paypal/paypal-server-sdk";

console.log(Object.getOwnPropertyNames(paypal.OrdersController.prototype));

const client = new paypal.Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET,
  },
  environment: paypal.Environment.Sandbox,
});

export default client;
