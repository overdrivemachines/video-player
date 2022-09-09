// Helper function to get elements
function $(el) {
  if (el.charAt(0) === "#") {
    // if el begins with # then find element with id
    return document.getElementById(el.substring(1));
  } else {
    return document.querySelector(el);
  }
}

const video = $(".video");
const progressRange = $(".progress-range");
const progressBar = $(".progress-bar");
const playBtn = $("#play-btn");
const volumeIcon = $("#volume-icon");
const volumeRange = $(".volume-range");
const volumeBar = $(".volume-bar");
const currentTime = $(".time-elapsed");
const duration = $(".time-duration");
const fullscreenBtn = $(".fullscreen");

// Play & Pause ----------------------------------- //
function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}
function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}

// Progress Bar ---------------------------------- //

// Volume Controls --------------------------- //

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

// Event Listeners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
// On Video End, show play icon
video.addEventListener("ended", showPlayIcon);
