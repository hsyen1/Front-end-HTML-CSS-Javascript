/*
index.js
* */

$(document).ready(function () {

    $("#gitHubSearchForm").on("submit", function() {

        var searchPhrase = $("#searchPhrase").val();
        var useStars = $("#useStars").val();
        var langChoice = $("#langChoice").val();


        if(searchPhrase) {
            resultList.text("Performing search...");
            var gitHubSearch = "https://api.github.com/search/repositories?q=" + encodeURIComponent(searchPhrase);
            if(langChoice !== "All") {
                gitHubSearch += "+language:" + encodeURIComponent(langChoice);
            }
            if(useStars) {
                gitHubSearch += "&sort=stars"
            }
        }

        // get request to retrieve the queried json objects
        $.get(gitHubSearch, function(r) {
            displayResults(r.items);
        });

        return false;
    });


 /*   var results = [{
        name: "jQuery",
        language: "Javascript",
        score: 4.5,
        showLog: function () {

        },
        owner: {
            login: "hansernyen",
            id: 123456
        }
    }, {
        name: "jQuery UI",
        language: "JavaScript",
        score: 3.5,
        showLog: function() {

        },
        owner: {
            login: "hansernyen",
            id: 123456
        }
    }];*/

    // jQuery is used to manipulate the section where the id is resultList
    var resultList = $("#resultList");
    resultList.text("This is from jQuery");

    // to hide or show the button when it is clicked
    var toggleButton = $("#toggleButton");
    toggleButton.on("click", function() {
        resultList.toggle(500);

        if(toggleButton.text() === "Hide") {
            toggleButton.text("Show");
        } else {
            toggleButton.text("Hide");
        }
    });

    // jQuery can retrieve the entire nav section as a list
    // the css can be modified directly
    var listItems = $("header nav li");
    listItems.css("font-weight", "bold");
    listItems.css("font-size", "18px");

    function displayResults(results) {
        // .each function takes in the list and iterates it
        // each object is passed in as an "item" and the tags are added into the DOM and rendered to the display
        resultList.empty();
        $.each(results, function(i, item) {
            var newResult = $("<div class='results'>" +
                "<div class='title'>" + item.name + "</div>" +
                "<div>Language: " + item.language + "</div>" +
                "<div>Owner: " + item.owner.login + "</div>" +
                "</div>");

            newResult.hover(function () {
                // make it darker
                $(this).css("background-color", "lightgray");
            }, function () {
                // reverse
                $(this).css("background-color", "transparent");
            });
            resultList.append(newResult);
        });
    }

});


