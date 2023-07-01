const express = require("express");
const bodyParser = require("body-parser");
const mainRoute = "/api/v1/";
require("dotenv").config();
const MongoDB = require("./src/config/db");
const { errorHandler } = require("./src/middlewares/errorHandler");
const cors = require("cors");
const { sendEmail } = require("./src/services/mailService");

MongoDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("public"));

app.use("/images", express.static("images"));
app.use("/icons", express.static("icons"));
app.use(`${mainRoute}car`, require("./src/routes/v1/carRoute"));
app.use(`${mainRoute}wisata`, require("./src/routes/v1/wisataRoute"));
app.use(`${mainRoute}outbond`, require("./src/routes/v1/wisataOutbondRoute"));
app.use(`${mainRoute}res-car`, require("./src/routes/v1/reservCarRoute"));
app.use(`${mainRoute}res-wisata`, require("./src/routes/v1/reservWisataRoute"));

app.use(
  `${mainRoute}res-outbond`,
  require("./src/routes/v1/reservWisataOutbondRoute")
);
app.use(
  `${mainRoute}res-custom`,
  require("./src/routes/v1/reservCustomWisata")
);
app.use(`${mainRoute}user`, require("./src/routes/v1/userRoute"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
