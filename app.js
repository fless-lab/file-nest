require("dotenv").config();

// Commont imports
const express = require("express");
const morgan = require("morgan");
const createError = require('http-errors')
const FileRoutes = require("./src/routes/file.routes");
const mongo = require("./src/common/database/mongodb"); 

// App configs
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initializations
mongo.init();


// Routes declarations
app.use("/files",FileRoutes);


// Handling errors
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 9330;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
