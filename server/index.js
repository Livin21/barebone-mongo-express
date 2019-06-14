const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, ".env") });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

require("./db/DatabaseManager").connect();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(req.body);
  next();
});

require("./routes")(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `App running at port ${port} and Database at ${
      process.env.MONGO_CONNECTION_URI
    }`
  );
});
