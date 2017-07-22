$(document).ready(function() { 
  var json = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow";
  $.getJSON(json, function(object) {
    $(".display").html(JSON.stringify(object));
  });
});