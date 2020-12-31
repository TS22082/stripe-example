import React, { useState, useEffect } from "react";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

function App() {
  const [product, setProduct] = useState({
    name: "Candle",
    price: 10,
    productBy: "GeekCentric",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };

    const headers = { "Content-Type": "application/json" };

    axios
      .post("/api/payment", body, headers)
      .then((res) => {
        console.log("RESPONSE", res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("/api")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Hi</h1>
      <StripeCheckout
        stripeKey={process.env.REACT_APP_KEY}
        token={makePayment}
        name="Buy a Candle"
        amount={product.price * 100}
      >
        <button>Buy a Candle</button>
      </StripeCheckout>
    </div>
  );
}

export default App;
