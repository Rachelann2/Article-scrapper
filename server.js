var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models");

var port = 4000;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// enter in the local house database 
mongoose.connect("mongodb://localhost/", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {

    // enter in the http website used for articles into axios.get
    axios.get("").then(function (response) {
        var $ = cheerio.load(response.data);
    });

    $("article h2").each(function (i, element) {
        var result = {};


        result.title = $(this)
            .children("a")
            .text();
        result.link = $(this)
            .children("a")
            .attr("href");
    })
})