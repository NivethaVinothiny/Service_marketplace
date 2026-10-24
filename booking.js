document.addEventListener("DOMContentLoaded", function () {
  setupMobileMenu();
  setupBookingLogic();
});

/* 1. Mobile Menu Toggle */
function setupMobileMenu() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
}

/* 2. Booking Form Live Summary & Validation Logic */
function setupBookingLogic() {
  const service = document.getElementById("service");
  const date = document.getElementById("date");
  const problem = document.getElementById("problem");
  const timeButtons = document.querySelectorAll(".time");
  let selectedTime = "11 AM–1 PM";

  if (date) {
    const today = new Date().toISOString().split("T")[0];
    date.min = today;
  }

  if (timeButtons.length > 0) {
    timeButtons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        timeButtons.forEach(function (item) {
          item.classList.remove("selected");
        });
        button.classList.add("selected");
        selectedTime = button.textContent;
        updateSummary();
      });
    });
  }

  if (problem) {
    problem.addEventListener("input", function () {
      const countSpan = document.getElementById("count");
      if (countSpan) countSpan.textContent = problem.value.length;
    });
  }

  if (service) service.addEventListener("change", updateSummary);
  if (date) date.addEventListener("change", updateSummary);

  function updateSummary() {
    let visit = 199;
    let labourMin = 500;
    let labourMax = 1200;
    let description = "Reliable Carpentry Services at your Doorstep";

    const serviceVal = service ? service.value : "Carpentry";

    if (serviceVal === "Plumbing") {
      visit = 149;
      labourMin = 300;
      labourMax = 900;
      description = "Quality Plumbing, Hassle-free Living";
    } else if (serviceVal === "Electrical") {
      visit = 179;
      labourMin = 400;
      labourMax = 1000;
      description = "Powering your Home with Safe, Reliable Solutions";
    } else if (serviceVal === "Painting") {
      visit = 249;
      labourMin = 600;
      labourMax = 1500;
      description = "Bring your home to life with beautiful colours";
    } else if (serviceVal === "Landscaping") {
      visit = 349;
      labourMin = 700;
      labourMax = 1500;
      description = "Nature's Beauty, Designed for your Home";
    }

    if (document.getElementById("summaryService")) document.getElementById("summaryService").textContent = serviceVal;
    if (document.getElementById("description")) document.getElementById("description").textContent = description;
    if (document.getElementById("visitPrice")) document.getElementById("visitPrice").textContent = "₹" + visit;
    if (document.getElementById("labourPrice")) document.getElementById("labourPrice").textContent = "₹" + labourMin + " – ₹" + labourMax;
    if (document.getElementById("totalPrice")) document.getElementById("totalPrice").textContent = "₹" + (visit + labourMin) + " – ₹" + (visit + labourMax);

    if (date && date.value !== "") {
      document.getElementById("summaryDate").textContent = date.value;
    } else if (document.getElementById("summaryDate")) {
      document.getElementById("summaryDate").textContent = "Choose a date";
    }

    if (document.getElementById("summaryTime")) document.getElementById("summaryTime").textContent = selectedTime;
  }

  // Auto-fill parameters from provider cards
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const providerParam = urlParams.get('provider');

  if (serviceParam && service) {
    for (let option of service.options) {
      if (option.value.toLowerCase().includes(serviceParam.toLowerCase())) {
        service.value = option.value;
        break;
      }
    }
  }

  if (providerParam) {
    let providerSelect = document.getElementById("providerSelect");
    if (providerSelect) {
      let found = false;
      for (let option of providerSelect.options) {
        if (option.value.toLowerCase().includes(providerParam.toLowerCase())) {
          providerSelect.value = option.value;
          found = true;
          break;
        }
      }
      if (!found) {
        const newOpt = document.createElement('option');
        newOpt.value = providerParam;
        newOpt.textContent = providerParam;
        providerSelect.appendChild(newOpt);
        providerSelect.value = providerParam;
      }
    }
  }
  updateSummary();

  // Form Submit & Popup Modals
  const bookingForm = document.getElementById("bookingForm");
  const summaryModalOverlay = document.getElementById("summaryModalOverlay");
  const loginPromptModalOverlay = document.getElementById("loginPromptModalOverlay");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (!isLoggedIn) {
        if (loginPromptModalOverlay) loginPromptModalOverlay.style.display = "flex";
        return;
      }

      const address = document.getElementById("address").value;
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const providerSelect = document.getElementById("providerSelect");
      const selectedProvider = providerSelect ? providerSelect.value : "Any available professional";

      const modalContent = document.getElementById("modalSummaryContent");
      if (modalContent) {
        modalContent.innerHTML = `
          <p><strong>Customer Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${service.value}</p>
          <p><strong>Assigned Expert:</strong> ${selectedProvider}</p>
          <p><strong>Service Address:</strong> ${address}</p>
          <p><strong>Date & Time:</strong> ${date.value} (${selectedTime})</p>
          <p><strong>Estimated Cost:</strong> ${document.getElementById("totalPrice").textContent}</p>
          <p style="color: #176b42; margin-top: 10px;"><strong>✓ No payment required now. Pay after service.</strong></p>
        `;
      }

      if (summaryModalOverlay) summaryModalOverlay.style.display = "flex";
    });
  }

  // Modal Close Handlers
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalDoneBtn = document.getElementById("modalDoneBtn");
  const closeLoginModal = document.getElementById("closeLoginModal");

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => { summaryModalOverlay.style.display = "none"; });
  }
  if (modalDoneBtn) {
    modalDoneBtn.addEventListener("click", () => {
      summaryModalOverlay.style.display = "none";
      window.location.href = "index.html";
    });
  }
  if (closeLoginModal) {
    closeLoginModal.addEventListener("click", () => { loginPromptModalOverlay.style.display = "none"; });
  }
}