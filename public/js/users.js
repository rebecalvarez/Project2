$(".like").on("click", function (event) {
  var id = $(this).data("id");
  console.log(id);

  // SEND THE PUT REQUEST
  $.ajax(`/api/stockfaves/${id}`, {
    type: 'DELETE'
  }).then(
    function () {
      // RELOAD THE PAGE TO GET THE UPDATED LIST FROM DB
      location.reload();
    }
  );
});
$(".download").on("click", function (event) {
    var url = $(this).attr("data");
    console.log(url);

    // SEND THE PUT REQUEST
    // $.ajax(`/api/download`, {
    //     type: 'POST',
    //     data: 
    // }).then(
    //     function () {
    //         // RELOAD THE PAGE TO GET THE UPDATED LIST FROM DB
    //         location.reload();
    //     }
    // );
});