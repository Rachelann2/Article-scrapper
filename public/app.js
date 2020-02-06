$.getJSON("/articles", function (data) {

    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<div data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</div>");
    }


});


$(document).on("click", "div", function () {
    $("#notes").empty();

    var thisId = $(this).attr("data-id");



    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })

        .then(function (data) {
            console.log(data);


        })
})