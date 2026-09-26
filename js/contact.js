(function () {
  var form = document.querySelector("[data-contact]");
  if (!form) return;
  var success = document.querySelector("[data-contact-success]");
  var rules = [
    { name: "name", test: function (v) { return v.trim().length >= 2; }, message: "Enter your name." },
    { name: "email", test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, message: "Enter a valid email address." },
    { name: "message", test: function (v) { return v.trim().length >= 10; }, message: "Write a note of at least a few words." }
  ];

  function fieldError(name, message) {
    var input = form.elements[name];
    var error = form.querySelector('[data-error-for="' + name + '"]');
    if (message) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = message;
    } else {
      input.removeAttribute("aria-invalid");
      error.textContent = "";
    }
  }

  rules.forEach(function (rule) {
    form.elements[rule.name].addEventListener("blur", function () {
      var value = form.elements[rule.name].value;
      fieldError(rule.name, rule.test(value) ? "" : rule.message);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var ok = true;
    rules.forEach(function (rule) {
      var message = rule.test(form.elements[rule.name].value) ? "" : rule.message;
      fieldError(rule.name, message);
      if (message) ok = false;
    });
    if (!ok) {
      var first = form.querySelector("[aria-invalid='true']");
      if (first) first.focus();
      return;
    }
    var name = form.elements.name.value.trim();
    form.hidden = true;
    success.hidden = false;
    success.innerHTML =
      "<h2>Thank you, " + name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + ".</h2>" +
      "<p>This preview keeps your note on this page only. It was not sent to a server. For the atelier, call <a href=\"tel:+918980906104\">89809 06104</a> or visit F-8, Balaji Centre, Memnagar.</p>";
    success.focus();
  });
})();
