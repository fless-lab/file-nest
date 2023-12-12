require("dotenv").config();

// Commont imports
const express = require("express");
const morgan = require("morgan");
const createError = require('http-errors')
const FileRoutes = require("./src/routes/file.routes");
const mongo = require("./src/common/database/mongodb"); 
const validateHMAC = require("./src/middlewares/hmac.middleware");
const { startGarbageCollectionCron } = require("./src/utils/garbageCollector");

// App configs
const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Initializations
mongo.init();

// Hmac global middleware
app.use(validateHMAC);

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
console.log(`🌐 Server running on port ${PORT} 🌐`);
  startGarbageCollectionCron();
});
