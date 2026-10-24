var service = document.getElementById("service");
var date = document.getElementById("date");
var problem = document.getElementById("problem");
var timeButtons = document.querySelectorAll(".time");

var selectedTime = "11 AM–1 PM";

// Set today's date as the minimum date
var today = new Date().toISOString().split("T")[0];
date.min = today;

// Change the selected time slot
timeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        timeButtons.forEach(function(item) {
            item.classList.remove("selected");
        });

        button.classList.add("selected");
        selectedTime = button.textContent;

        updateSummary();
    });
});

// Update the character counter
problem.addEventListener("input", function() {
    document.getElementById("count").textContent =
        problem.value.length;
});

// Update summary when service or date changes
service.addEventListener("change", updateSummary);
date.addEventListener("change", updateSummary);

// Update the booking summary
function updateSummary() {
    var visit = 199;
    var labourMin = 500;
    var labourMax = 1200;
    var description = "Relilable Carpentry Services at your Doorstep";

    if (service.value === "Plumbing") {
        visit = 149;
        labourMin = 300;
        labourMax = 900;
        description = "Quality Plumbing, Hassle-free Living";
    } else if (service.value === "Electrical") {
        visit = 179;
        labourMin = 400;
        labourMax = 1000;
        description = "Powering your Home with Safe, Reliable Solutions";
    } else if (service.value === "Painting") {
        visit = 249;
        labourMin = 600;
        labourMax = 1500;
        description = "Bring your home to life with beautiful colours";
    } else if (service.value === "Landscaping") {
        visit = 349;
        labourMin = 700;
        labourMax = 1500;
        description = "Nature's Beauty, Designed for your Home";
    }

    document.getElementById("summaryService").textContent =
        service.value;

    document.getElementById("description").textContent =
        description;

    document.getElementById("visitPrice").textContent =
        "₹" + visit;

    document.getElementById("labourPrice").textContent =
        "₹" + labourMin + " – ₹" + labourMax;

    document.getElementById("totalPrice").textContent =
        "₹" + (visit + labourMin) + " – ₹" + (visit + labourMax);

    if (date.value !== "") {
        document.getElementById("summaryDate").textContent =
            date.value;
    } else {
        document.getElementById("summaryDate").textContent =
            "Choose a date";
    }

    document.getElementById("summaryTime").textContent =
        selectedTime;
}

// Validate the form
document.getElementById("bookingForm").addEventListener("submit",
function(event) {
    event.preventDefault();

    var address = document.getElementById("address").value;
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;

    var isValid = true;

    document.getElementById("addressError").textContent = "";
    document.getElementById("dateError").textContent = "";
    document.getElementById("problemError").textContent = "";
    document.getElementById("nameError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("message").textContent = "";

    if (address === "") {
        document.getElementById("addressError").textContent =
            "Please enter your address.";
        isValid = false;
    }

    if (date.value === "") {
        document.getElementById("dateError").textContent =
            "Please select a date.";
        isValid = false;
    }

    if (problem.value === "") {
        document.getElementById("problemError").textContent =
            "Please describe the problem.";
        isValid = false;
    }

    if (name === "") {
        document.getElementById("nameError").textContent =
            "Please enter your name.";
        isValid = false;
    }

    if (phone.length < 10) {
        document.getElementById("phoneError").textContent =
            "Please enter a valid phone number.";
        isValid = false;
    }

    if (isValid === true) {
        document.getElementById("message").textContent =
            "Your booking request is ready!";
    }
});

// Display the initial summary
updateSummary();