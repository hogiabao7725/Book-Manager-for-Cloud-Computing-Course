require("dotenv").config();
const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();
app.set("trust proxy", 1); // required for secure cookies behind Render's proxy

app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(require("./config/session")); // centralized session on Atlas
app.use("/", require("./routes/bookRoutes"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
