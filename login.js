const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  localStorage.setItem("isLoggedIn", "true");
  message.textContent = "Login successful! Redirecting...";
  const returnTo = new URLSearchParams(window.location.search).get("returnTo");
  window.location.href = returnTo === "booking.html" ? "booking.html" : "index.html";
});

document.getElementById("forgot").addEventListener("click", e => {
  e.preventDefault();
  message.textContent = "Password recovery will be available when configured.";
});