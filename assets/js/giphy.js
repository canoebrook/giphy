$(document).ready(function() {

  var dogs = [
    "Cavalier King Charles Spaniel",
    "Boxer", "French Bulldog", "German Shepherd", "Terrier", "Poodle", "Beagle",
    "Pug"
  ];

  // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".dog-button", function() {
    $("#dogs").empty();
    $(".dog-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var dogDiv = $("<div class=\"dog-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var dogImage = $("<img>");
          dogImage.attr("src", still);
          dogImage.attr("data-still", still);
          dogImage.attr("data-animate", animated);
          dogImage.attr("data-state", "still");
          dogImage.addClass("dog-image");

          dogDiv.append(p);
          dogDiv.append(dogImage);

          $("#dogs").append(dogDiv);
        }
      });
  });

  $(document).on("click", ".dog-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-dog").on("click", function(event) {
    event.preventDefault();
    var newDog = $("input").eq(0).val();

    if (newDog.length > 2) {
      dogs.push(newDog);
    }

    populateButtons(dogs, "dog-button", "#dog-buttons");

  });

  populateButtons(dogs, "dog-button", "#dog-buttons");
});
