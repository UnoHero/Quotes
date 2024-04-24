require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const quoteRoutes = require("./routes/quotes");
const userRoutes = require("./routes/user");
const cors = require("cors");

// express app
const app = express()

// cors
app.use(cors())

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
})

// routes
app.use("/api/quotes", quoteRoutes)
app.use("/api/user", userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    })
  })
  .catch((error) => {
    console.log(error);
  })