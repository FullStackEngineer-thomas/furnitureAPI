const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./router");
mongoose
  .connect("mongodb://127.0.0.1/FurnitureApi", { useNewUrlParser: true })
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use("/api", routes);

    app.listen(3000, () => {
      console.log("server has started!");
    });
  })
  .catch((err) => console.log(err));
