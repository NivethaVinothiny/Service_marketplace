const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const button = form.querySelector(".login-btn");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  message.textContent = "Login successful! ";
  window.location.href = "index.html";
  
});

document.getElementById("forgot").addEventListener("click", e => {
  e.preventDefault();
  message.textContent =
    "Password recovery will be available when configured.";
});

document.getElementById("signup").addEventListener("click", e => {
  e.preventDefault();
  message.textContent =
    "Connect your registration page to create an account.";
});