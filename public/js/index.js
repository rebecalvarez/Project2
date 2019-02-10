// Get references to page elements
var $search = $("#search");
var $submitBtn = $("#submit");

var imagesArray = [];





// The API object contains methods for each kind of request we'll make
var API = {
  getUnsplash: function(images) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Client-ID de9a63d28bf00119e0b303571beaa6b9dd734475f5040a5e349a430224ae4ebf"
      },
      type: "GET",
      url: "https://api.unsplash.com/search/photos?page=1&query=" + images,
      data: JSON.stringify(images)
    }).then(function (data) {
      for (var i = 0; i < data.results.length; i++) {
        var tempObj = {};
        tempObj.url = data.results[i].urls.regular;
        tempObj.width = data.results[i].width;
        imagesArray.push(tempObj);
      }
    });
  },
  getPexels: function (images) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "563492ad6f91700001000001964c556e478d4420be7dafdf01f3663a",
        "Access-Control-Allow-Origin":
          "https://cors-anywhere.herokuapp.com/http://127.0.0.1:3000",
        "Access-Control-Allow-Credentials": true
      },
      type: "GET",
      url:
        "https://api.pexels.com/v1/search?query=" +
        images +
        "&per_page=15&page=1",
      data: JSON.stringify(images)
    }).then(function(data) {
      // console.log(data);
      for (var i = 0; i < data.photos.length; i++) {
        var tempObj = {};
        tempObj.url = data.photos[i].url;
        tempObj.width = data.photos[i].width;
        imagesArray.push(tempObj);
      }
    });
  },
  getPixabay: function (images) {
    return $.ajax({
      type: "GET",
      url:
        "https://pixabay.com/api/?key=11535423-299e4955bd04e97354a960b00&q=" +
        images +
        "&image_type=photo",
      data: JSON.stringify(images)
    }).then(function (data) {
      for (var i = 0; i < data.hits.length; i++) {
        var tempObj = {};
        tempObj.url = data.hits[i].pageURL;
        tempObj.width = data.hits[i].imageWidth;
        imagesArray.push(tempObj);
      }
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
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
var handleFormSubmit = function (event) {
  event.preventDefault();

  var images = $search.val().trim();

  if (!images) {
    alert("You must enter an image search description!");
    return;
  }
  imagesArray = [];

  // API.show(images).then(function() {
  //   refreshExamples();
  // });
  API.getUnsplash(images);
  API.getPixabay(images);
  API.getPexels(images);
  console.log(imagesArray);

  $("form")[0].reset();
  $search.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
//$exampleList.on("click", ".delete", handleDeleteBtnClick);

//Chrome anchor link bug fix
$(function() {
  $("a[href*='#']:not([href='#'])").click(function() {
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") &&
      location.hostname === this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          1000
        );
        return false;
      }
    }
  });
});




$("#createAccount").click(function(){
var us={
  email:"",
  username:"",
  password:""
}
  us.email=$("#signup-email").val();
us.username=$("#signup-username").val();
us.password=$("#signup-password").val();


API.saveExample(us);
})