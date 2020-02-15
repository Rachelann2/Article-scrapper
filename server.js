var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");


var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models");

var PORT = 4000;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));


// enter in the local house database 
mongoose.connect("mongodb://localhost/articleScraper", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {

    // enter in the http website used for articles into axios.get
    axios.get("https://thenextweb.com/dd/").then(function (response) {
        var $ = cheerio.load(response.data);


        $("article h2").each(function (i, element) {
            var result = {};


            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

        res.send("Scrape Complete");
    });
});

app.get("/", function (req, res) {
    db.Article.find({}).then(function (dbResults) {
        var object = {
            articles: dbResults
        };
        res.render("index", object);
    });
});


app.get("/articles", function (req, res) {

    db.Article.find({})
        .then(function (articles) {

            res.json(articles);


        }).catch(function (err) {
            res.json(error);

        });
});


app.get("/articles/:id", function (req, res) {

    db.Article.findOne({ _id: req.params.id })

        .populate("note")
        .then(function (articles) {
            res.json(articles);
        })
        .catch(function (err) {
            res.json(err);
        });

});


app.post("/articles/:id", function (req, res) {




    db.Note.create(req.body)
        .then(function (savedNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: savedNote._id }, { new: true });
        })
        .then(function (articles) {
            res.json(articles);
        })
        .catch(function (err) {
            res.json(err);
        });


});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});