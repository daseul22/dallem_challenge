const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { userRoute, eventRoute } = require("./routes");

const app = express();
const port = 4000;
const { User, Event, RepEvent } = require("./models");
//User.findAll({
//  where: {
//    password: "1234",
//  },
//}).then((res) => {
//  console.log(res);
//});
//User.findAll({
//  attributes: ["email"],
//  include: [
//    {
//      attributes: ["name"],
//      model: Event,
//      through: { attributes: [] },
//    },
//    {
//      attributes: ["name"],
//      model: RepEvent,
//      through: { attributes: [] },
//    },
//  ],
//}).then((res) => {
//  console.log(res[0]);
//});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/user", userRoute);
app.use("/event", eventRoute);

app.listen(port, () => {
  console.log("Server is listening to Port 4000");
});

module.exports = app;
