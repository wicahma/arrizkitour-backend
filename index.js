const express = require("express");
const bodyParser = require("body-parser");
const { multers } = require("./src/middlewares/multer");
const mainRoute = "/api/v1/";
require("dotenv").config();
const MongoDB = require("./src/config/db");
const { errorHandler } = require("./src/middlewares/errorhandler");

MongoDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(multers.single("gambar"));

app.use(`${mainRoute}car`, require("./src/routes/v1/carRoute"));
app.use(`${mainRoute}wisata`, require("./src/routes/v1/wisataRoute"));
app.use(`${mainRoute}res-car`, require("./src/routes/v1/reservCarRoute"));
app.use(`${mainRoute}res-wisata`, require("./src/routes/v1/reservWisataRoute"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
