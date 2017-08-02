// StackOverflow has a bunch of public json files to use if so desire
$(document).ready(function() {
  var json = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow";
  $.getJSON(json, function(data) {
    var parsed = data;

    var array = $.map(parsed, function(value, index) {
      return [value];
    });
    var text = "";

    for (i=0; i<11; i++) {
      var entry = array[i]
      for (j=0; j<5; j++) {
        text += JSON.stringify(array[i]) + "<br>"
      }
    }



  /*   for (var entry in data) { //object.forEach(function(val) {
    /*   var keys = Object.keys(val);
      html += "<div class = 'test'>";
      keys.forEach(function(key) {
        html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
      });
      html += "</div><br>";
      html */



    $(".display").html(text);
    console.log(typeof data);
  });
});
