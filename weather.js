const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");
const { url } = require("inspector");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var cityinput = req.body.city;
  var units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityinput +
    "&appid=80ddf98c4d7e9566f791cf5840f87211&units=" +
    units;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weather = JSON.parse(data);
      var temprature = weather.main.temp;
      var icon = weather.weather[0].icon;
      var imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      var description=weather.weather[0].description;
      res.write(
        "<h1>The temprature of " + cityinput + " is " + temprature + ".</h1>"
      );
      res.write("<h1>The description of "+ cityinput+ " is "+ description +".</h1>")
      res.write("<img src="+imageUrl+">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is running");
});
