var $burgerName = $("#name-txt");
let $modal = $("#snack-modal");
let $snackBtn = $("#feed-btn")
let $imgPal = $("#imgPal")

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
$("#pal-select").on("change", function() {
 
  if($("#pal-select").val() == 1){    
    $imgPal.attr("src","assets/img/scooby.jpg")
  }else{    
    $imgPal.attr("src","assets/img/shaggy.jpg")
  }
  
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