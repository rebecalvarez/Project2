// Get references to page elements
var $search = $("#search");
var $submitBtn = $("#submit");

// The API object contains methods for each kind of request we'll make
var API = {
  getUnsplash: function(images) {
    console.log(images);
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Client-ID de9a63d28bf00119e0b303571beaa6b9dd734475f5040a5e349a430224ae4ebf"
      },
      type: "GET",
      url: "https://api.unsplash.com/search/photos?page=1&query=" + images,
      data: JSON.stringify(images)
    }).then(function(data) {
      data.results.forEach(function(element) {
        console.log(element);
        console.log(element.description);
        console.log(element.urls.regular);
      });
    });
  },
  getPixabay: function(images) {
    return $.ajax({
      type: "GET",
      url:
        "https://pixabay.com/api/?key=11535423-299e4955bd04e97354a960b00&q=" +
        images +
        "&image_type=photo",
      data: JSON.stringify(images)
    }).then(function(data) {
      data.hits.forEach(function(element) {
        console.log(element.largeImageURL);
        console.log(element.tags);
      });
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var images = $search.val().trim();
  console.log(images);

  if (!images) {
    alert("You must enter an image search description!");
    return;
  }

  // API.show(images).then(function() {
  //   refreshExamples();
  // });
  API.getUnsplash(images);
  API.getPixabay(images);

  $("form")[0].reset();
  $search.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
//$exampleList.on("click", ".delete", handleDeleteBtnClick);
