
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

// Mobile navigation
if (navToggle && navMenu) {
  navToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
}

// Contact form validation
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Check required fields and browser validation rules
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value.trim();

  // Additional validation
  if (
    name.length < 2 ||
    !email ||
    !subject ||
    message.length < 10
  ) {
    formFeedback.textContent =
      "Please complete every field correctly.";
    formFeedback.className = "error";
    return;
  }

  // Display a demo success message
  formFeedback.textContent =
    `Thank you, ${name}! Your message about "${subject}" ` +
    "has been submitted successfully.";

  formFeedback.className = "success";

  // Clear the form after submission
  contactForm.reset();
});