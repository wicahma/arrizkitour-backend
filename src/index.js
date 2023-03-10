const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const MongoDB = require("./config/db");
const carRouter = require("./v1/routes/CarRoute");
const wisataRouter = require("./v1/routes/wisataRoute");
const reservWisataRouter = require("./v1/routes/reservWisataRoute");
const reservCarRouter = require("./v1/routes/reservCarRoute");

MongoDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/paket-wisata", wisataRouter);
app.use("/api/v1/sewa-mobil", carRouter);
app.use("/api/v1/reservasi-wisata", reservWisataRouter);
app.use("/api/v1/reservasi-car", reservCarRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
