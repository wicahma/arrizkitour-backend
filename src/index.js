const express = require("express");
const router = require("./routes/paketRoute");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/paket", router);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
