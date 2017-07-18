var generateGIF = {
  // List of topics related to the word moist
  topics: ["moist", "dank", "humid", "misty", "muggy", "rainy", "slippery", "soaked", "sodden", "stormy", "drenched", "dripping", "drizzling", "moistened", "pouring", "raining", "soaking", "sopping", "soused", "teeming", "aqueous", "clammy", "dewy", "showery", "slimy", "slushy", "soppy", "teary", "watery"],
  // Function to create buttons
  createButtons: function() {
    $("#buttonarea").empty();

    // Loop through topics and create associated buttons
    for (var i = 0; i < generateGIF.topics.length; i++) {

      var topicsBtn = $("<button>");
      topicsBtn.addClass("topics-button");
      topicsBtn.attr("search-query", generateGIF.topics[i]);
      topicsBtn.text(generateGIF.topics[i]);
      $("#buttonarea").append(topicsBtn);
    }
  },


}

$(document).ready(function() {

  generateGIF.createButtons();

  $(".topics-button").on("click", function() {

    var searchquery = $("<div>");

    searchquery.addClass("gifdisplay");
    searchquery.text($(this).attr("search-query"));

    $("#gifarea").append(searchquery);

  });


});