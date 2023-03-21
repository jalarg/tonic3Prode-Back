require("dotenv").config();
const express = require('express');
const app  = express(); 
const { port, corsOrigin } = require('./config');
const cors = require("cors");
const morgan = require("morgan");

// ROUTES   
const routes = require('./routes');

// MIDDLEWARES
app.use(
    cors({
      origin: corsOrigin,
      credentials: true,
    })
)

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
    console.log('Server listen on port', port);
  });