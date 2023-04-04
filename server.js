require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { port, corsOrigin } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const { mongoDBHelpers } = require("./helpers");
const ActionLog = require("./db_models/ActionLog");

// ROUTES
const routes = require("./routes");

// MIDDLEWARES
app.use(async (req, res, next) => {
  try {
    let uid;
    if (req.method === "GET") {
      const path = req.path.split("/");
      console.log(path, "path")
      uid = path[path.length - 1];
      console.log(uid, "uid")
    } else if (
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "DELETE"
    ) {
      uid = req.body.uid;
    }
    const logData = {
      timestamp: new Date(),
      user: uid,
      method: req.method,
      path: req.path,
      data: req.method === "GET" ? null : req.body,
    };
    console.log(logData);
    await ActionLog.create(logData);
    console.log("log created");
    next();
  } catch (err) {
    next(err);
  }
});



app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    //credentials: true,
  })
);

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());

// ROUTES
app.use("/api", routes);

// ERROR MIDDLEWARE
app.use(function (err, req, res, next) {
  console.error(err, err.stack);
  res.status(500).send(err);
});

// START SERVER
app.listen(port, () => {
  console.log("Server listen on port", port);
});

// CONNECT TO MONGODB
(async () => {
  await mongoDBHelpers.connect();
})();
