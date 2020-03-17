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


  $("#new-char-btn").on("click", function() {
    console.log('stuff');
    
    $("#new-char-form").show();
  });

  $("#char-submit-btn").on("click", function() {
    // TODO: validate and save data
    
    $("#new-char-form").hide();
  });

});