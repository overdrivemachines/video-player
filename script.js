// Helper function to get elements
function $(el) {
  if (el.charAt(0) === "#") {
    // if el begins with # then find element with id
    return document.getElementById(el.substring(1));
  } else {
    return document.querySelector(el);
  }
}

const player = $(".player");
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
const speed = $(".player-speed");

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
// Calculate display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, 0);
  return `${minutes}:${seconds}`;
}

// Update progress bar as video plays
function updateProgress() {
  // console.log("current time", video.currentTime, "duration", video.duration);

  // Set Progress Bar width
  const width = (video.currentTime * 100) / video.duration;
  progressBar.style.width = `${width}%`;

  // Elapsed Time in Video
  currentTime.textContent = `${displayTime(video.currentTime)} / `;

  // Total Length of Video
  duration.textContent = displayTime(video.duration);
}

// Change time when user clicks on progress bar
function setProgress(e) {
  // In an event, this refers to the element that received the event
  // Find out where user has clicked on the progress bar
  const width = this.clientWidth;

  const progressPercent = (e.offsetX * 100) / width;
  video.currentTime = (progressPercent / 100) * video.duration;
  updateProgress();
}

// Volume Controls --------------------------- //

let lastVolume = 0.5;

// Mute/Unmute
function toggleMute() {
  // Check if muted
  if (volumeIcon.classList.contains("fa-volume-xmark")) {
    // Unmute volume
    volumeIcon.className = "";
    volumeIcon.classList.add("fa-solid", "fa-volume-high");
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.setAttribute("title", "Mute");
  } else {
    // Mute volume
    volumeIcon.className = "";
    volumeIcon.classList.add("fa-solid", "fa-volume-xmark");
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.setAttribute("title", "Unmute");
  }
}

// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Round volume. Eg 0.12 becomes 0.1 and 0.96 becomes 1.00
  volume = Math.round(volume * 10) / 10;
  // set volume bar
  volumeBar.style.width = `${volume * 100}%`;
  // set video player's volume
  video.volume = volume;
  // Change icon depending on volume
  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fa-solid", "fa-volume-high");
  } else if (volume <= 0.7 && volume > 0) {
    volumeIcon.classList.add("fa-solid", "fa-volume-low");
  } else if (volume === 0) {
    volumeIcon.classList.add("fa-solid", "fa-volume-off");
  }
  lastVolume = volume;
}

// Change Playback Speed -------------------- //
function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
  console.log("Entered Fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
  console.log("Exited Fullscreen");
}

let fullscreen = false;
// Toggle Fullscreen.
// Executed when fullscreen button is clicked.
// Not executed when ESC key is pressed while in fullscreen mode
function toggleFullscreen() {
  !fullscreen ? openFullscreen(player) : closeFullscreen();
  fullscreen = !fullscreen;
}

// This is executed when fullscreen is exited using
// ESC key and without it (by clicking the fullscreen icon)
function exitHandler() {
  if (
    !document.webkitIsFullScreen &&
    !document.mozFullScreen &&
    !document.msFullscreenElement
  ) {
    fullscreen = false;
    video.classList.remove("video-fullscreen");
  }
}

// Event Listeners
// Play/Pause Button
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
// On Video End, show play icon
video.addEventListener("ended", showPlayIcon);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);

// Jump to time using progress bar
progressRange.addEventListener("click", setProgress);

// Volume adjustment
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);

// Speed adjustment
speed.addEventListener("change", changeSpeed);

// Fullscreen
fullscreenBtn.addEventListener("click", toggleFullscreen);
// When ESC key is pressed to exit fullscreen
document.addEventListener("fullscreenchange", exitHandler, false);
document.addEventListener("mozfullscreenchange", exitHandler, false);
document.addEventListener("MSFullscreenChange", exitHandler, false);
document.addEventListener("webkitfullscreenchange", exitHandler, false);
