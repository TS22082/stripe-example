const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4 } = require("uuid");
const uuid = v4;

router.get("/", (req, res) => {
  res.send("success");
});

router.post("/payment", (req, res) => {
  const { product, token } = req.body;

  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchase of: ${product.name}`,
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
