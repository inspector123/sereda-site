// If autoplay is blocked, the native video controls stay available.
var video = document.querySelector("video");
if (video) {
  var attempt = video.play();
  if (attempt && attempt.catch) attempt.catch(function () {});
}
