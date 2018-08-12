
  var topics = ["rabbit", "rat", "snake", "cheetah","elephant","hyena", "cat", "lion", "pig", "dog",
  "goat", "giraffe", "cow", "crocodile", "bird","panda", "chicken", "kangaroo", "eagle", "cheetah", "cow"];

  // Function to generate and  display buttons for all the animals within the topics array.
  function renderButtons() {
  $("#buttonRow").empty();

  for (var i = 0; i < topics .length; i++) {
  var button = $("<button>");
  button.addClass("animalButton");
  button.attr("data-animal", topics [i]);
  button.text(topics[i]);

  $("#buttonRow").append(button);
  }
  }

  // To add more animals to the array
  $("#add-animal").on("click", function(event) {
  event.preventDefault();

  var animal = $("#animal-input").val().trim();

  topics .push(animal);
  $("#animal-input").val("");

  renderButtons();

  });

  // To retrieve animal Gifs with the Giphy API
  function retrAnimalGifs() {

  var name = $(this).attr("data-animal");
  var str = name.split(" ").join("+");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  str + "&api_key=FBetv8l1K7Jn15B0BV7ugEHlWk9dEudj";

  $.ajax({
  url: queryURL,
  method: "GET",

  })
  .then(function( response ) {

  var dataArr = response.data;

  // Create and display div elements for every retrieved Gif
  $("#gif").empty();
  for (var i = 0; i < dataArr.length; i++) {
  var gifDiv = $("<div>");
  gifDiv.addClass("animalGif");

  var r = $("<h2>").html("Rating: " + dataArr[i].rating);
  gifDiv.append(r);

  var image = $("<img>");
  image.attr("src", dataArr[i].images.fixed_height_still.url);
  image.attr("data-still", dataArr[i].images.fixed_height_still.url);
  image.attr("data-animate", dataArr[i].images.fixed_height.url);
  image.attr("data-state", "still");
  gifDiv.append(image);

  $("#gif").append(gifDiv);
  }
  });
  }

  //To animate a still Gif and stop an animated Gif
  function animateGif() {

  var state = $(this).find("img").attr("data-state");

    if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
    } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
    }
    }
    $(document).ready(function() {
      renderButtons();
      });

  $(document).on("click", ".animalButton", retrAnimalGifs);

  $(document).on("click", ".animalGif", animateGif);

 

