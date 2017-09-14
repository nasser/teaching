window.addEventListener("load", function() {
  var startTime = new Date();
  var timer = document.createElement("timer");
  document.body.appendChild(timer);

  setInterval(function() {
    var interval = new Date() - startTime;
    var seconds = Math.floor(interval / 1000 % 60) + "";
    var minutes = Math.floor(interval / 1000 / 60 % 60) + "";
    var hours = Math.floor(interval / 1000 / 60 / 60) + "";

    if(seconds.length == 1) seconds = "0" + seconds;
    if(minutes.length == 1) minutes = "0" + minutes;

    var slides = Array.prototype.slice.call(document.querySelectorAll("slide"));
    var current = document.querySelector(".current");
    var currentIndex = parseInt(localStorage.stopWorkCurrentIndex);

    timer.innerHTML = minutes + ":" + seconds + "<br>" + currentIndex + "/" + slides.length;
  }, 100);
});
