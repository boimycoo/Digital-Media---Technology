const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Initialize EmailJS
(function () {
  emailjs.init("p75x9dtjSxlA3GUgu"); // Account public key
})();

let serviceID = "service_hnfsjt7"; // Email service ID
let templateID = "template_6f5i1be"; // Email template ID

// Contact Form Validation and Submission Handler
function sendMessage(event) {
  event.preventDefault();

  // Get form element
  const form = event.target.closest("form");

  // Get form inputs
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const submitButton = form.querySelector('button[type="button"]');

  // Get values and trim whitespace
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Clear previous error states
  clearErrors(form);

  // Validation flags
  let isValid = true;

  // Validate name
  if (name === "") {
    showError(nameInput, "Name is required");
    isValid = false;
  } else if (name.length < 2) {
    showError(nameInput, "Name must be at least 2 characters");
    isValid = false;
  }

  // Validate email
  if (email === "") {
    showError(emailInput, "Email is required");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError(emailInput, "Please enter a valid email address");
    isValid = false;
  }

  // Validate message
  if (message === "") {
    showError(messageInput, "Message is required");
    isValid = false;
  } else if (message.length < 10) {
    showError(messageInput, "Message must be at least 10 characters");
    isValid = false;
  }

  // If validation passes, send email
  if (isValid) {
    // Disable submit button to prevent double submission
    submitButton.disabled = true;
    submitButton.innerText = "Sending...";

    const params = {
      sendername: name,
      senderemail: email,
      message: message,
    };

    emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        console.log("Email sent successfully:", res);
        showSuccess(form, "Message sent successfully!");
        form.reset();
        submitButton.disabled = false;
        submitButton.innerText = "Send";
      })
      .catch((err) => {
        console.error("Email sending failed:", err);
        showError(submitButton, "Failed to send message.");
        submitButton.disabled = false;
        submitButton.innerText = "Send";
      });
  }
}

// Email validation regex
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show error message
function showError(input, message) {
  input.style.borderColor = "#ef4444";

  // Create or update error message
  let errorElement = input.parentElement.querySelector(".error-message");
  if (!errorElement) {
    errorElement = document.createElement("span");
    errorElement.className = "error-message";
    errorElement.style.color = "#ef4444";
    errorElement.style.fontSize = "0.875rem";
    errorElement.style.marginTop = "0.25rem";
    errorElement.style.display = "block";
    input.parentElement.appendChild(errorElement);
  }
  errorElement.textContent = message;
}

// Clear all errors in form
function clearErrors(form) {
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.style.borderColor = "";
  });

  const errorMessages = form.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => msg.remove());

  const successMessages = form.querySelectorAll(".success-message");
  successMessages.forEach((msg) => msg.remove());
}

// Show success message
function showSuccess(form, message) {
  let successElement = form.querySelector(".success-message");
  if (!successElement) {
    successElement = document.createElement("div");
    successElement.className = "success-message";
    successElement.style.color = "#10b981";
    successElement.style.fontSize = "1rem";
    successElement.style.marginTop = "1rem";
    successElement.style.padding = "0.75rem";
    successElement.style.backgroundColor = "#d1fae5";
    successElement.style.borderRadius = "0.375rem";
    successElement.style.textAlign = "center";
    form.appendChild(successElement);
  }
  successElement.textContent = message;

  // Remove success message after 5 seconds
  setTimeout(() => {
    successElement.remove();
  }, 5000);
}

// Real-time validation (optional but recommended)
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      // Validate on blur (when user leaves the field)
      input.addEventListener("blur", function () {
        if (this.value.trim() !== "") {
          validateField(this);
        }
      });

      // Clear error on input
      input.addEventListener("input", function () {
        const errorElement = this.parentElement.querySelector(".error-message");
        if (errorElement) {
          errorElement.remove();
          this.style.borderColor = "";
        }
      });
    });
  });
});

// Validate individual field
function validateField(input) {
  const value = input.value.trim();
  const name = input.getAttribute("name");

  clearFieldError(input);

  switch (name) {
    case "name":
      if (value === "") {
        showError(input, "Name is required");
      } else if (value.length < 2) {
        showError(input, "Name must be at least 2 characters");
      }
      break;
    case "email":
      if (value === "") {
        showError(input, "Email is required");
      } else if (!isValidEmail(value)) {
        showError(input, "Please enter a valid email address");
      }
      break;
    case "message":
      if (value === "") {
        showError(input, "Message is required");
      } else if (value.length < 10) {
        showError(input, "Message must be at least 10 characters");
      }
      break;
  }
}

// Clear error for specific field
function clearFieldError(input) {
  input.style.borderColor = "";
  const errorElement = input.parentElement.querySelector(".error-message");
  if (errorElement) {
    errorElement.remove();
  }
}
