(function () {
  var root = document.querySelector("[data-product]");
  if (!root) return;

  var id = new URLSearchParams(window.location.search).get("id");
  var product = PERAN.findProduct(id);
  var missing = document.querySelector("[data-missing]");

  var relatedSection = document.querySelector("[data-related-section]");
  if (!product) {
    if (missing) missing.hidden = false;
    root.hidden = true;
    if (relatedSection) relatedSection.hidden = true;
    return;
  }

  document.title = product.name + " — PERAN";
  root.querySelector("[data-name]").textContent = product.name;
  root.querySelector("[data-price]").textContent = PERAN.formatPrice(product.price);
  root.querySelector("[data-category]").textContent = PERAN.categoryLabel(product.category);
  root.querySelector("[data-description]").textContent = product.description;

  var main = root.querySelector("[data-main]");
  var thumbs = root.querySelector("[data-thumbs]");
  var index = 0;

  function show(next) {
    index = next;
    main.src = product.images[index];
    main.alt = product.alt;
    thumbs.querySelectorAll("button").forEach(function (button, i) {
      button.setAttribute("aria-current", i === index ? "true" : "false");
    });
  }

  thumbs.innerHTML = product.images.map(function (src, i) {
    return (
      '<button type="button" aria-label="Photo ' + (i + 1) + ' of ' + product.images.length + '" aria-current="' + (i === 0 ? "true" : "false") + '">' +
        '<img src="' + src + '" alt="" width="1080" height="1440">' +
      '</button>'
    );
  }).join("");
  thumbs.querySelectorAll("button").forEach(function (button, i) {
    button.addEventListener("click", function () {
      show(i);
    });
  });
  show(0);

  var sizes = root.querySelector("[data-sizes]");
  sizes.innerHTML = PERAN.sizes.map(function (size) {
    var inputId = "size-" + size.toLowerCase();
    return (
      '<label class="size-option" for="' + inputId + '">' +
        '<input type="radio" name="size" id="' + inputId + '" value="' + size + '"' + (size === "M" ? " checked" : "") + '>' +
        '<span>' + size + '</span>' +
      '</label>'
    );
  }).join("");

  var qty = root.querySelector("[data-qty]");
  root.querySelector("[data-qty-dec]").addEventListener("click", function () {
    qty.value = String(Math.max(1, Number(qty.value) - 1));
  });
  root.querySelector("[data-qty-inc]").addEventListener("click", function () {
    qty.value = String(Math.min(5, Number(qty.value) + 1));
  });

  var status = root.querySelector("[data-status]");
  root.querySelector("[data-add]").addEventListener("click", function () {
    var chosen = root.querySelector('input[name="size"]:checked');
    if (!chosen) {
      status.textContent = "Choose a size before adding this piece.";
      return;
    }
    var amount = Math.max(1, Math.min(5, Number(qty.value) || 1));
    qty.value = String(amount);
    PERAN.cart.add(product.id, chosen.value, amount);
    status.textContent = product.name + " in size " + chosen.value + " is in your cart.";
  });

  var related = document.querySelector("[data-related]");
  if (related) {
    var others = PERAN.products.filter(function (item) {
      return item.id !== product.id;
    }).slice(0, 3);
    related.innerHTML = others.map(function (item) {
      return (
        '<article class="card">' +
          '<a class="card-link" href="product.html?id=' + item.id + '">' +
            '<div class="card-media"><img src="' + item.images[0] + '" alt="' + item.alt + '" width="1080" height="1440"></div>' +
            '<h3>' + item.name + '</h3>' +
            '<p class="price">' + PERAN.formatPrice(item.price) + '</p>' +
          '</a>' +
        '</article>'
      );
    }).join("");
  }
})();
