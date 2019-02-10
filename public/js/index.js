
var $search = $("#search");
var $imagesSection = $("#imagesSection");
var $submitBtn = $("#submit");

var imagesArray = [];

// The API object contains methods for each kind of request we'll make
var API = {
  getUnsplash: function (images) {
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
      for (var i = 0; i < data.results.length; i++) {
        var tempObj = {};
        tempObj.url = data.results[i].urls.regular;
        tempObj.width = data.results[i].width;
        imagesArray.push(tempObj);
      }
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
      for (var i = 0; i < data.hits.length; i++) {
        var tempObj = {};
        tempObj.url = data.hits[i].largeImageURL;
        tempObj.width = data.hits[i].imageWidth;
        imagesArray.push(tempObj);
      }
    });
  },
  getPexels: function(images) {
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
    }).then(function (data) {
      // console.log(data);
      for (var i = 0; i < data.photos.length; i++) {
        var tempObj = {};
        tempObj.url = data.photos[i].src.original;
        tempObj.width = data.photos[i].width;
        imagesArray.push(tempObj);
      }
      clearImagesDiv();
      showImages(imagesArray);
      scrollToImages();
    });
  },
  saveStockFave: function(record) {
    return $.ajax({
<<<<<< eddy4.1
      url: "api/examples",
      type: "GET"
    });
  },

  checkUser: function (email) {
    return $.ajax({
      url: "api/examples/" + email,
      type: "GET"
    }).then(function (json) {
      if (json.length > 0) {
        exists = true;
      }

      else {
        exists = false;
      }
    });
  },
  findUser: function (user) {
    return $.ajax({
      url: "api/examples/" + user.email,
      type: "GET"
    }).then(function (json) {

      //  require("bcrypt-nodejs");
      if (json.length == 0) {
        //
        // User doesnt Exist
        //
        alert("No matching account with that email");
      }
      else {
        if (user.password == json[0].password) {
//
//log in
//
alert("Logged in");
        }
        else{
          alert("Incorrect Password");
        }


      }


    })
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  saveExample: function (example) {

      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/stockfaves",
      data: JSON.stringify(record)
    });
  },
  saveUser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/user",
      data: JSON.stringify(user)
    });
  }
};

// SHOW IMAGES AFTER EVERY SEARCH
var showImages = function(imagesArray) {
  for (var i = 0; i < imagesArray.length; i++) {
    console.log(imagesArray[i].url);
    console.log(imagesArray[i].width);

    // create div for figure
    var imageDiv = $("<div>").addClass("dt-sc-portfolio");
    imageDiv.addClass("width1");

    // create figure
    var imageFigure = $("<figure>");
    imageDiv.append(imageFigure);

    // create image
    var image = $("<img>").attr("src", imagesArray[i].url);
    imageFigure.append(image);

    // create fig caption
    var figCaption = $("<figcaption>");
    imageFigure.append(figCaption);

    // create div, class fig-overlay
    var figOverlay = $("<div>");
    figOverlay.addClass("fig-overlay");
    figCaption.append(figOverlay);

    // create div, class external-icons
    var icons = $("<div>").addClass("external-icons");
    figOverlay.append(icons);

    // create a, class zoom, href, icon class fa-fa-search-plus
    var zoom = $("<a>").attr("href", imagesArray[i].url);
    zoom.attr("data-gal", "prettyPhoto[gallery]");
    zoom.attr("target", "_blank");
    zoom.addClass("zoom");
    var zoomIcon = $("<span>").addClass("fa fa-search-plus");
    zoom.append(zoomIcon);
    icons.append(zoom);

    // create a, class like, href, icon class fa-fa-heart
    var like = $("<a>").attr("href", "/api/examples/");
    var like = $("<a>").attr("data", imagesArray[i].url);
    like.addClass("like");
    var likeIcon = $("<span>").addClass("fa fa-heart");
    like.append(likeIcon);
    icons.append(like);

    // create a, class view, href, icon class fa fa-download
    var download = $("<a>").attr("href", "#");
    download.addClass("view");
    var downloadIcon = $("<span>").addClass("fa fa-download");
    download.append(downloadIcon);
    icons.append(download);

    $("#imagesSection").append(imageDiv);
  }
};

// SCROLL TO IMAGES AFTER SEARCH IS DONE
var scrollToImages = function() {
  window.scrollBy({
    top: 700,
    left: 0,
    behavior: "smooth"
  });
};

// CLEAR IMAGES DIV AFTER NEW SEARCH
var clearImagesDiv = function() {
  $("#imagesSection").text("");
};

// HANDLEFORMSUBMIT IS CALLED WHENEVER USER SEARCHES A TERM
var handleFormSubmit = function(event) {
  event.preventDefault();

  // TERM INPUT FOR IMAGE SEARCH TERM
  var images = $search.val().trim();

  // VALIDATION TO AVOID EMPTY SEARCHES
  if (!images) {
    alert("You must enter an image search description!");
    return;
  }

  // SETS THE EMPTY ARRAY THAT WILL HOLD OUR IMAGE OBJECTS
  imagesArray = [];

  // EVERY TIME THERE IS A NEW SEARCH, IT CLEARS THE IMAGES CONTAINER
  clearImagesDiv();

  // CALLS IMAGE APIS WITH SEARCH INPUT
  API.getUnsplash(images);
  API.getPixabay(images);
  API.getPexels(images);

  // CLEARS THE INPUT FORM FOR UX
  $("form")[0].reset();

  // SETS THE IMAGE SEARCH TERM TO BLANK TO ENABLE VALIDATION
  $search.val("");
};

// [PENDING USER ID] HANDLE LIKE BUTTON ACTION TO SAVE STOCK FAVE
var handleLike = function(event) {
  event.preventDefault();

  // [PENDING] VALIDATE USER ID LOGGED IN

  // LIKE BUTTON CLICKED AND SAVING URL TO STOCKFAVE
  var stockFave = {
    url: ""
  };
  stockFave.url = $(this).attr("data");

//Chrome anchor link bug fix
$(function () {
  $("a[href*='#']:not([href='#'])").click(function () {
  // SEND URL OBJECT TO STOCKFAVES TABLE
  API.saveStockFave(stockFave);

  // [PENDING] MAKE SURE IT'S TIED TO USER ID
};

//CHROME ANCHOR LINK BUG FIX
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

// CREATE ACCOUNT BY SIGN UP
$("#createAccount").click(function() {
  var us = {
    email: "",
    username: "",
    password: ""
  };
  us.email = $("#signup-email").val();
  us.username = $("#signup-username").val();
  us.password = $("#signup-password").val();

  API.saveUser(us);
});


$("#createAccount").click(function () {
  var us = {
    email: "",
    username: "",
    password: ""
  }
  us.email = $("#signup-email").val();
  us.username = $("#signup-username").val();
  us.password = $("#signup-password").val();

  //check if user exist


  var API2 = {
    exist: false,
    saveExample: function (example) {


      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/examples",
        data: JSON.stringify(example)
      });
    },


    getUser: function (us) {
      return $.ajax({
        url: "api/examples/" + us.email,
        type: "GET"
      }).then(function (json) {
        // alert(json);
        if (json.length > 0) {
          alert("user already exists");
        }
        else {
          API2.saveExample(us);
        }
      });
    }

  }
  API2.getUser(us);


})



$("#loggingIn").click(function () {


  var user2 = {
    email: "",
    password: ""
  }

  user2.email = $("#signin-email").val();
  user2.password = $("#signin-password").val();
  API.findUser(user2);

})
// ADD EVENT LISTENERS TO THE SUBMIT AND LIKE BUTTONS
$submitBtn.on("click", handleFormSubmit);
$imagesSection.on("click", ".like", handleLike);er
