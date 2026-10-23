
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Mobile navigation
menuToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("show");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

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
