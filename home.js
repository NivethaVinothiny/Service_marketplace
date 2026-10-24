/* ==========================================================
   TaskNest - Home Page JavaScript
   Features: mobile menu, active link, category links,
   photo fallback
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  setupMobileMenu();
  highlightActiveLink();
  setupCategoryLinks();
  setupPhotoFallbacks();
});

/* ---------- 1. Mobile navigation menu ---------- */
function setupMobileMenu() {
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");

  if (!toggle || !menu) {
    return;
  }

  function closeMenu() {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  toggle.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close the menu with the Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      closeMenu();
      toggle.focus();
    }
  });

  // Close the menu when a link is chosen
  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });
}

/* ---------- 2. Highlight the active page link ---------- */
function highlightActiveLink() {
  var links = document.querySelectorAll(".nav-link");
  var currentPage = window.location.pathname.split("/").pop();

  // The home page may be opened as "/" or "index.html"
  if (currentPage === "" || currentPage === "index.html") {
    currentPage = "index.html";
  }

  links.forEach(function (link) {
    var isActive = link.getAttribute("href") === currentPage;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

/* ---------- 3. Category links ----------
   Each "Browse ..." link goes to the Services page and passes the
   chosen category in the URL, e.g. services.html?category=Cleaning */
function setupCategoryLinks() {
  var links = document.querySelectorAll("[data-category]");

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var category = link.getAttribute("data-category");
      window.location.href = "services.html?category=" + encodeURIComponent(category);
    });
  });
}

/* ---------- 4. Photo fallback ----------
   If a photo file is missing, show a soft green placeholder
   instead of a broken-image icon. */
function setupPhotoFallbacks() {
  var photos = document.querySelectorAll("img[data-photo]");

  photos.forEach(function (img) {
    var frame = img.closest(".photo-frame");

    function markMissing() {
      if (frame) {
        frame.classList.add("photo-missing");
      }
    }

    // The image may have already failed before this script ran
    if (img.complete && img.naturalWidth === 0) {
      markMissing();
    }

    img.addEventListener("error", markMissing);
  });
}
