var mongoose = require("mongoose");



var noteSchema = new schema({
    title: String,
    body: String
});


var Note = mongoose.model("Note", noteSchema);

module.exports = Note;