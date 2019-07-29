var $burgerName = $("#name-txt");
let $modal = $("#snack-modal");
let $snackBtn = $("#feed-btn")

$burgerName.focus();

$(".js_updateBurger").on("click",function(e){


    e.preventDefault();
    sessionStorage.setItem("snack",$(this).data("id")); 
    
    
    $modal.modal("show");
   
})
$("#feed-btn").on("click",function(){

  var id = sessionStorage.getItem("snack")

   //Send the PUT request.
    $.ajax("/api/snacks/" + id, {
        type: "PUT",
        data: {devoured: 1,customer: $("#pal-select").val()}
      }).then(
        function() {
          
          // Reload the page to get the updated list
          location.reload();
        }
      );

})

$(".js_deleteSnack").on("click",function(e){

    e.preventDefault();
    var id = $(this).data("id")
    
    // Send the PUT request.
    $.ajax("/api/snacks/" + id, {
        type: "DELETE"
      }).then(
        function() {
          
          // Reload the page to get the updated list
          location.reload();
        }
      );

})

$("#submit-btn").on("click",function(e){
   
    e.preventDefault();

    if($burgerName.val() !== ""){

        var newBurger = $burgerName.val()

        $.post("/api/snacks",{snack_name: newBurger}).then(function(){
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
        })

    }
})