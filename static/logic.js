$(document).ready(function() {



  console.log('I am loaded');
  $("#new-char-form").hide();

  // TODO: hide the form
  // $("#new-character-form").hide();

  // QUESTION: What is this code doing?
  $("#search-btn").on("click", function() {
    var searchedCharacter = $("#character-search").val().trim();
  
    // Using a RegEx Pattern to remove spaces from searchedCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    searchedCharacter = searchedCharacter.replace(/\s+/g, "").toLowerCase();
  
    // QUESTION: What does $.get do? What are the parameters it is expecting?
    $.get("/api/characters/" + searchedCharacter, function(data) {
      console.log(data);
      if (data) {
        $("#stats").show();
        $("#name").text(data.name);
        $("#role").text(data.role);
        $("#age").text(data.age);
        $("#force-points").text(data.forcePoints);
      }
      else {
        $("#name").text("The force is not strong with this one. Your character was not found.");
        $("#stats").hide();
      }
    });
  });

  $("#char-submit-btn").on("click", function() {
    event.preventDefault();
    console.log('submit form func');
    // console.log( $("#new-char-form").serializeArray() );

    console.log( $("#characterName").val().trim() );
    
    let newData = {
      "routeName": $("#characterName").val().trim(),
      "name": $("#characterName").val().trim(),
      "role": $("#characterRole").val().trim(),
      "age": $("#characterAge").val().trim(),
      "forcePoints": $("#characterForcePoints").val().trim()
    }
    // console.log(newData);
    

    
    // TODO: validate and save data

    // let newData = {
    //   "routeName": "bazemalbus",
    //   "name": "Baze Malbus",
    //   "role": "Heavy fire",
    //   "age": 39,
    //   "forcePoints": 0
    // }

    $.post("/api/characters", newData,
      function (data, status) {
        if(status !== 'success') {
          throw "something went wrong with post";
        }
        
        console.log('posted?');
        console.log(data);
        console.log(status);
    });
    


    $("#new-char-form").hide();
  });

  // $("#new-char-form").on("submit", function() {
  //   event.preventDefault();
  //   console.log('inside form submit func');

  //   console.log( $(this).serialize() );
    
    
  // });


  $("#new-char-btn").on("click", function() {
    console.log('new char btn clicked, show form');
    
    $("#new-char-form").show();
  });


});