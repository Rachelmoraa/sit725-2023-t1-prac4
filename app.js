
const express = require("express");
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const routes = require("./Routes/routes");

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')))

app.use("", routes);

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
})
