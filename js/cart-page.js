(function () {
  var list = document.querySelector("[data-cart-list]");
  var empty = document.querySelector("[data-cart-empty]");
  var summary = document.querySelector("[data-cart-summary]");
  if (!list) return;

  function render() {
    var lines = PERAN.cart.read().filter(function (line) {
      return PERAN.findProduct(line.id);
    });
    if (empty) empty.hidden = lines.length > 0;
    if (summary) summary.hidden = lines.length === 0;
    list.innerHTML = lines.map(function (line) {
      var product = PERAN.findProduct(line.id);
      return (
        '<li class="line">' +
          '<a class="line-media" href="product.html?id=' + product.id + '">' +
            '<img src="' + product.images[0] + '" alt="' + product.alt + '" width="1080" height="1440">' +
          '</a>' +
          '<div class="line-body">' +
            '<h2><a href="product.html?id=' + product.id + '">' + product.name + '</a></h2>' +
            '<p>Size ' + line.size + '</p>' +
            '<p class="price">' + PERAN.formatPrice(product.price) + '</p>' +
            '<div class="qty">' +
              '<button type="button" data-dec aria-label="Decrease quantity of ' + product.name + ', size ' + line.size + '">−</button>' +
              '<input id="qty-' + product.id + '-' + line.size + '" type="number" min="1" max="5" value="' + line.qty + '" aria-label="Quantity for ' + product.name + ', size ' + line.size + '">' +
              '<button type="button" data-inc aria-label="Increase quantity of ' + product.name + ', size ' + line.size + '">+</button>' +
            '</div>' +
            '<button type="button" class="text-btn" data-remove>Remove</button>' +
            '<p class="line-total">' + PERAN.formatPrice(product.price * line.qty) + '</p>' +
          '</div>' +
        '</li>'
      );
    }).join("");

    var sub = document.querySelector("[data-subtotal]");
    if (sub) sub.textContent = PERAN.formatPrice(PERAN.cart.subtotal(lines));

    list.querySelectorAll(".line").forEach(function (row, index) {
      var line = lines[index];
      var input = row.querySelector("input");
      row.querySelector("[data-dec]").addEventListener("click", function () {
        PERAN.cart.setQty(line.id, line.size, Math.max(1, line.qty - 1));
        render();
      });
      row.querySelector("[data-inc]").addEventListener("click", function () {
        PERAN.cart.setQty(line.id, line.size, Math.min(5, line.qty + 1));
        render();
      });
      input.addEventListener("change", function () {
        var next = Number(input.value);
        if (!next) next = 1;
        PERAN.cart.setQty(line.id, line.size, next);
        render();
      });
      row.querySelector("[data-remove]").addEventListener("click", function () {
        PERAN.cart.remove(line.id, line.size);
        render();
      });
    });
  }

  render();
})();
