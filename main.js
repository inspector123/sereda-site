// Vance Sereda site. Reveal on scroll, video fallback. No dependencies.
document.documentElement.classList.add("js");

(function () {
  var els = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

  els.forEach(function (el) { io.observe(el); });
})();

// If autoplay is blocked, tapping the phone frame toggles playback.
document.querySelectorAll(".phone video").forEach(function (video) {
  var attempt = video.play();
  if (attempt && attempt.catch) {
    attempt.catch(function () {
      var frame = video.closest(".phone");
      if (!frame) return;
      frame.addEventListener("click", function () {
        if (video.paused) { video.play().catch(function () {}); }
        else { video.pause(); }
      });
    });
  }
});
