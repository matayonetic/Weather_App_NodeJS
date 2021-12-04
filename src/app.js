// MODULES
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// APP
const app = express();

// SET TEMPLATING ENGINE
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));
hbs.registerPartials(path.join(__dirname, "../views/partials"));

// PUBLIC DIRECTORY
const public = path.join(__dirname, "../public");
app.use(express.static(public));

// SERVER START
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ROUTES
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",    
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, wData) => {
        if (error) {
          return res.send({ error });
        }
        
        res.send({
          forecast: wData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not Found",
    message: "Ooops! Its a 404!",
  });
});
