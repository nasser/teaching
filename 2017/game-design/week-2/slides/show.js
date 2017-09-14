function deselectAll() {
  var currents = document.querySelectorAll(".current");
  [].forEach.call(currents, function(c) {
    var video = c.querySelector("video");
    if(video) {
      video.pause();
      video.currentTime = 0;
    }

    c.removeAttribute("class");
  });
}

function select(element) {
  element.setAttribute("class", "current");
}

window.addEventListener("keydown", function(e) {
  var slides = Array.prototype.slice.call(document.querySelectorAll("slide"));
  var current = document.querySelector(".current");

  // mode switching
  var modes = document.querySelectorAll("link[mode]");
  for (var i = 0; i < modes.length; i++) {
    var href = modes[i].getAttribute("href").replace(/\.css/, "");
    if(e.key == href[0] && e.ctrlKey) {
      document.body.setAttribute("class", href);
    }
  }

  // right
  if(e.key == "ArrowRight" && !e.altKey && !e.shiftKey) {
    deselectAll();
    select(current ? (current.nextElementSibling || current.parentNode.firstElementChild) : document.querySelector("slide"));

  // left
  } else if(e.key == "ArrowLeft" && !e.altKey && !e.shiftKey) {
    deselectAll();
    select(current ? (current.previousElementSibling || current.parentNode.lastElementChild) : document.querySelector("slide"));

  // space
  } else if(e.key == "Space") {
    var video = document.querySelector(".current video");
    if(video) {
      if(video.paused)
        video.play();
      else
        video.pause();
    }
  }

  // cross-window communication
  localStorage.stopWorkCurrentIndex = slides.indexOf(document.querySelector(".current"));

  // replay gifs
  setTimeout(function() {
    var img = document.querySelector(".current img");
    if(img) {
      img.setAttribute("src", img.getAttribute("src"));
    }
  }, 0);
});

setInterval(function() {
  var slides = Array.prototype.slice.call(document.querySelectorAll("slide"));
  var current = document.querySelector(".current");
  var currentIndex = parseInt(localStorage.stopWorkCurrentIndex);
  location.hash = currentIndex;

  if(currentIndex != slides.indexOf(current)) {
    deselectAll();
    select(slides[currentIndex] || slides[0]);
  }
}, 10);

window.addEventListener("load", function() {
  localStorage.stopWorkCurrentIndex = (location.hash && parseInt(location.hash.substr(1))) || 0;
  if(localStorage.stopWorkCurrentIndex < 0)
    localStorage.stopWorkCurrentIndex = 0;
});
