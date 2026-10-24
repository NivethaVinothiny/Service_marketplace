const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  message.textContent = "Login successful! Redirecting...";
  window.location.href = "index.html";
});

document.getElementById("forgot").addEventListener("click", e => {
  e.preventDefault();
  message.textContent = "Password recovery will be available when configured.";
});