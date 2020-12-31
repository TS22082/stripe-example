const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;
require("dotenv").config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// set production rules
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// api routes
app.use("/api", require("./routes/api-routes"));

// server start
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
