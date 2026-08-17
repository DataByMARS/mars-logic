/* ============================================================
   MARS — site behaviour
   Dependency-free and progressive: the site works without JS;
   everything here is an enhancement.
   ============================================================ */
(function () {
  "use strict";

  /* Signal that JS is available, so CSS can safely hide-then-reveal. */
  document.documentElement.classList.add("js");

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- Hero: grow the ascending bars on load (echoes the MARS icon) ---- */
  var bars = document.querySelectorAll(".hero .bar");
  if (bars.length && !reduce) {
    bars.forEach(function (bar, i) {
      bar.style.transform = "scaleY(0)";
      bar.style.transition = "transform 0.9s cubic-bezier(0.22,0.61,0.36,1) " + (0.15 + i * 0.13) + "s";
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        bars.forEach(function (bar) { bar.style.transform = "scaleY(1)"; });
      });
    });
  }

  /* ---- Contact form via Formspree (AJAX, no page reload) ---- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector("[type=submit]");
      var original = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }

      status.className = "form-status";
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            status.textContent = "Thank you — your message is on its way. We'll be in touch soon.";
            status.classList.add("is-success");
          } else {
            return response.json().then(function (json) {
              var msg = json && json.errors
                ? json.errors.map(function (er) { return er.message; }).join(", ")
                : "Something went wrong. Please email us at hello@mars-logic.com.";
              status.textContent = msg;
              status.classList.add("is-error");
            });
          }
        })
        .catch(function () {
          status.textContent = "Network error. Please email us at hello@mars-logic.com.";
          status.classList.add("is-error");
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = original; }
        });
    });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
