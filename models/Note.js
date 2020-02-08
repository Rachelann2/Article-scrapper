var mongoose = require("mongoose");

var schema = mongoose.Schema;

var noteSchema = new schema({
    title: String,
    body: String
});


var Note = mongoose.model("Note", noteSchema);

module.exports = Note;