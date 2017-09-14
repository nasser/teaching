if(location.protocol == "http:") {
  var lastDate = new Date();
  setInterval(function() {
    var http = new XMLHttpRequest();
    http.open('HEAD', location.pathname);
    http.onreadystatechange = function() {
      var date = new Date(http.getResponseHeader("Last-Modified"));
      if (date > lastDate) {
        location.reload();
      }
    }
    http.send();
  }, 500);
}
