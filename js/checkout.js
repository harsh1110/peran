(function () {
  var form = document.querySelector("[data-checkout]");
  if (!form) return;

  var summary = document.querySelector("[data-summary]");
  var empty = document.querySelector("[data-checkout-empty]");
  var panel = document.querySelector("[data-checkout-panel]");
  var done = document.querySelector("[data-confirmation]");

  var rules = [
    { name: "full-name", test: function (v) { return v.trim().length >= 2; }, message: "Enter the name for the order." },
    { name: "email", test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, message: "Enter a valid email address." },
    { name: "phone", test: function (v) { return (v.replace(/\D/g, "").length >= 8); }, message: "Enter a phone number we could reach." },
    { name: "address", test: function (v) { return v.trim().length >= 5; }, message: "Enter a street address." },
    { name: "city", test: function (v) { return v.trim().length >= 2; }, message: "Enter a city." },
    { name: "postal", test: function (v) { return /^[0-9]{6}$/.test(v.trim()); }, message: "Enter a 6-digit PIN code." }
  ];

  function lines() {
    return PERAN.cart.read().filter(function (line) {
      return PERAN.findProduct(line.id);
    });
  }

  function renderSummary() {
    var items = lines();
    var has = items.length > 0;
    if (empty) empty.hidden = has;
    if (panel) panel.hidden = !has;
    if (!summary) return;
    if (!has) {
      summary.innerHTML = "";
      return;
    }
    summary.innerHTML =
      "<ul>" + items.map(function (line) {
        var product = PERAN.findProduct(line.id);
        return "<li><span>" + product.name + " · " + line.size + " × " + line.qty + "</span><span>" + PERAN.formatPrice(product.price * line.qty) + "</span></li>";
      }).join("") + "</ul>" +
      '<p class="subtotal"><span>Subtotal</span><span>' + PERAN.formatPrice(PERAN.cart.subtotal(items)) + "</span></p>" +
      "<p class=\"fine\">Prototype checkout. Nothing is charged and nothing is sent to the atelier.</p>";
  }

  function fieldError(name, message) {
    var input = form.elements[name];
    var error = form.querySelector('[data-error-for="' + name + '"]');
    if (!input || !error) return;
    if (message) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = message;
    } else {
      input.removeAttribute("aria-invalid");
      error.textContent = "";
    }
  }

  function validate() {
    var ok = true;
    rules.forEach(function (rule) {
      var value = form.elements[rule.name].value;
      var message = rule.test(value) ? "" : rule.message;
      fieldError(rule.name, message);
      if (message) ok = false;
    });
    return ok;
  }

  rules.forEach(function (rule) {
    form.elements[rule.name].addEventListener("blur", function () {
      var value = form.elements[rule.name].value;
      fieldError(rule.name, rule.test(value) ? "" : rule.message);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!lines().length) {
      renderSummary();
      return;
    }
    if (!validate()) {
      var first = form.querySelector("[aria-invalid='true']");
      if (first) first.focus();
      return;
    }
    var items = lines();
    var order = {
      id: "PRN-" + String(Date.now()).slice(-6),
      name: form.elements["full-name"].value.trim(),
      email: form.elements["email"].value.trim(),
      total: PERAN.cart.subtotal(items),
      items: items.map(function (line) {
        var product = PERAN.findProduct(line.id);
        return { name: product.name, size: line.size, qty: line.qty, line: product.price * line.qty };
      })
    };
    PERAN.cart.clear();
    if (panel) panel.hidden = true;
    if (empty) empty.hidden = true;
    if (done) {
      done.hidden = false;
      done.innerHTML =
        "<p class=\"eyebrow\">Confirmed</p>" +
        "<h2>Thank you, " + PERAN.escape(order.name) + ".</h2>" +
        "<p>Order <strong>" + order.id + "</strong> is held in this preview only. No payment was taken and the atelier was not notified.</p>" +
        "<ul>" + order.items.map(function (item) {
          return "<li><span>" + item.name + " · " + item.size + " × " + item.qty + "</span><span>" + PERAN.formatPrice(item.line) + "</span></li>";
        }).join("") + "</ul>" +
        '<p class="subtotal"><span>Subtotal</span><span>' + PERAN.formatPrice(order.total) + "</span></p>" +
        "<p>A note would have gone to " + PERAN.escape(order.email) + ".</p>" +
        '<a class="btn" href="shop.html">Continue browsing</a>';
      done.focus();
    }
  });

  renderSummary();
})();
