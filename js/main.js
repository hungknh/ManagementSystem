// =============================================
// PASSWORD SHOW/HIDE TOGGLE (login.html + signup.html)
// One handler for every .toggle-pw button instead of
// three separate copies of the same logic.
// =============================================
document.querySelectorAll(".toggle-pw").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const input = document.getElementById(btn.dataset.target);
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    btn.textContent = show ? "Hide" : "Show";
  });
});

// =============================================
// PASSWORD STRENGTH METER (signup.html only)
// =============================================
(function () {
  const pwInput = document.getElementById("signupPassword");
  if (!pwInput) return;

  const fill = document.getElementById("strengthFill");
  const label = document.getElementById("strengthLabel");
  const levels = [
    { label: "", color: "", width: "0%" },
    { label: "Weak", color: "bg-danger", width: "25%" },
    { label: "Fair", color: "bg-warning", width: "50%" },
    { label: "Good", color: "bg-info", width: "75%" },
    { label: "Strong", color: "bg-success", width: "100%" }
  ];

  pwInput.addEventListener("input", function () {
    const val = pwInput.value;
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    fill.className = "progress-bar " + levels[score].color;
    fill.style.width = levels[score].width;
    label.textContent = val.length > 0 ? levels[score].label : "";
  });
})();

// =============================================
// LOGIN FORM (login.html)
// =============================================
(function () {
  const form = document.getElementById("loginForm");
  if (!form) return;

  const errorMsg = document.getElementById("errorMsg");
  const successModal = new bootstrap.Modal(document.getElementById("successModal"));

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      errorMsg.classList.remove("d-none");
      return;
    }
    errorMsg.classList.add("d-none");
    successModal.show();
  });

  document.getElementById("okBtn").addEventListener("click", function () {
    window.location.href = "home.html";
  });
})();

// =============================================
// SIGNUP FORM (signup.html)
// =============================================
(function () {
  const form = document.getElementById("signupForm");
  if (!form) return;

  const errorMsg = document.getElementById("errorMsg");
  const successModal = new bootstrap.Modal(document.getElementById("successModal"));

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.remove("d-none");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const pw = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (!name) return showError("Please enter your full name.");
    if (!email || !/\S+@\S+\.\S+/.test(email)) return showError("Please enter a valid email address.");
    if (pw.length < 6) return showError("Password must be at least 6 characters.");
    if (pw !== confirm) return showError("Passwords do not match.");

    errorMsg.classList.add("d-none");
    successModal.show();
  });

  document.getElementById("okBtn").addEventListener("click", function () {
    window.location.href = "login.html";
  });
})();

// =============================================
// COURSE MODAL (home.html)
// Bootstrap's modal handles open/close/backdrop/Esc —
// this only fills in the content for whichever course was clicked.
// =============================================
(function () {
  const modalEl = document.getElementById("courseModal");
  if (!modalEl) return;

  const courseData = {
    html: {
      name: "HTML",
      desc: "HTML stands for HyperText Markup Language. It creates the structure of a web page using headings, paragraphs, images, and links.",
      topics: [
        "Document structure and DOCTYPE declaration",
        "Headings, paragraphs, and text formatting",
        "Links, images, and multimedia elements",
        "Lists, tables, and forms",
        "Semantic HTML5 elements (header, nav, section, footer)"
      ]
    },
    css: {
      name: "CSS",
      desc: "CSS stands for Cascading Style Sheets. It controls the appearance of web pages, including colors, fonts, spacing, and layouts.",
      topics: [
        "Selectors, properties, and values",
        "Box model: margin, border, padding",
        "Colors, fonts, and text styling",
        "Flexbox and CSS Grid layout",
        "Responsive design and media queries"
      ]
    },
    bootstrap: {
      name: "Bootstrap",
      desc: "Bootstrap is a front-end framework. It provides ready-made components and a responsive grid system to build websites quickly.",
      topics: [
        "Bootstrap grid system (12-column layout)",
        "Pre-built UI components (navbar, cards, modals)",
        "Responsive utilities and breakpoints",
        "Bootstrap forms and buttons",
        "Customizing Bootstrap with variables"
      ]
    },
    js: {
      name: "JavaScript",
      desc: "JavaScript is a programming language that makes web pages interactive. It can handle button clicks, form validation, popups, and dynamic content.",
      topics: [
        "Variables, data types, and operators",
        "Functions, loops, and conditionals",
        "DOM manipulation and event listeners",
        "Form validation and user input handling",
        "Fetch API and working with JSON data"
      ]
    }
  };

  modalEl.addEventListener("show.bs.modal", function (e) {
    const key = e.relatedTarget.dataset.course;
    const data = courseData[key];
    document.getElementById("modalCourseName").textContent = data.name;
    document.getElementById("modalCourseDesc").textContent = data.desc;
    document.getElementById("modalTopics").innerHTML = data.topics
      .map(function (t) { return "<li>" + t + "</li>"; })
      .join("");
  });
})();