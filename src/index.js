const express = require("express");
const bodyParser = require("body-parser");
const { multers } = require("./middlewares/multer");
const mainRoute = "/api/v1/";
require("dotenv").config();
const MongoDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorhandler");

MongoDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(multers.single("gambar"));

app.use(`${mainRoute}car`, require("./routes/v1/carRoute"));
app.use(`${mainRoute}wisata`, require("./routes/v1/wisataRoute"));
app.use(`${mainRoute}res-car`, require("./routes/v1/reservCarRoute"));
app.use(`${mainRoute}res-wisata`, require("./routes/v1/reservWisataRoute"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
