var generateGIF = {
  // List of topics, first word is general topic
  topics: ["food", "apple", "avocado", "bacon", "bread", "burrito", "cake", "chips", "cream cheese", "dessert", "dough", "grapefruit", "ice cream", "ketchup", "pizza", "ravioli", "tofu"],
  // Function to create buttons
  createButtons: function () {
    $("#buttonarea").empty();

    // Loop through topics and create associated buttons, purposefully leaves out first element
    for (var i = 1; i < generateGIF.topics.length; i++) {
      var topicsBtn = $("<button>");
      topicsBtn.addClass("topics-button");
      topicsBtn.attr("data-query", generateGIF.topics[i]);
      topicsBtn.text(generateGIF.topics[i]);
      $("#buttonarea").append(topicsBtn);
    }
  },
  addButtons: function () {
    //  Event Listener for adding searchable button
    $("#add-food").on("click", function (event) {
      event.preventDefault();

      var food = $("#food-input").val().trim();
      if ($("input").val() === "") {
        alert("Please enter a value.");
      } else {
        generateGIF.topics.push(food);
        generateGIF.createButtons();
      }
    });
  },
  displayGIFs: function () {
    var word = $(this).attr("data-query");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + word + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .done(function (response) {
        $("#gifarea").empty();
        var results = response.data;
        if (results === "") {
          alert("Uh oh! You picked a weird button. Try again!");
        }
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='gif-display'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var gifImage = $("<img>");

          gifImage.attr("src", results[i].images.fixed_height_still.url);
          gifImage.attr("data-still", results[i].images.fixed_height_still.url);
          gifImage.attr("data-animate", results[i].images.fixed_height.url);
          gifImage.attr("data-state", "still");
          gifImage.addClass("gifclass");

          gifDiv.append(p);
          gifDiv.append(gifImage);

          $("#gifarea").prepend(gifDiv);
        }
      });
  },
  pauseGIF: function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  },
  Clicker: function () {
    $(document).ready(function () {
      generateGIF.createButtons();
      generateGIF.addButtons();
      $(document).on("click", ".topics-button", generateGIF.displayGIFs);
      $(document).on("click", ".gifclass", generateGIF.pauseGIF);
    });
  }
};

generateGIF.Clicker();
