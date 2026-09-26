(function () {
  var grid = document.querySelector("[data-grid]");
  var empty = document.querySelector("[data-empty]");
  var sort = document.querySelector("[data-sort]");
  if (!grid || !sort) return;

  var params = new URLSearchParams(window.location.search);
  var category = params.get("category") || "all";
  var known = PERAN.categories.some(function (item) {
    return item.id === category;
  });
  if (!known) category = "all";

  function selected() {
    return PERAN.products.filter(function (product) {
      return category === "all" || product.category === category;
    });
  }

  function ordered(list) {
    var mode = sort.value;
    return list.slice().sort(function (a, b) {
      if (mode === "price-asc") return a.price - b.price;
      if (mode === "price-desc") return b.price - a.price;
      if (mode === "name") return a.name.localeCompare(b.name);
      return PERAN.products.indexOf(a) - PERAN.products.indexOf(b);
    });
  }

  function render() {
    var list = ordered(selected());
    grid.innerHTML = list.map(function (product) {
      return (
        '<article class="card">' +
          '<a class="card-link" href="product.html?id=' + product.id + '">' +
            '<div class="card-media">' +
              '<img src="' + product.images[0] + '" alt="' + product.alt + '" width="1080" height="1440">' +
            '</div>' +
            '<p class="eyebrow">' + PERAN.categoryLabel(product.category) + '</p>' +
            '<h2>' + product.name + '</h2>' +
            '<p class="price">' + PERAN.formatPrice(product.price) + '</p>' +
          '</a>' +
        '</article>'
      );
    }).join("");
    if (empty) empty.hidden = list.length > 0;
    document.querySelectorAll("[data-filter]").forEach(function (button) {
      var on = button.getAttribute("data-filter") === category;
      button.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      category = button.getAttribute("data-filter");
      var url = new URL(window.location.href);
      if (category === "all") url.searchParams.delete("category");
      else url.searchParams.set("category", category);
      window.history.replaceState({}, "", url);
      render();
    });
  });

  sort.addEventListener("change", render);
  render();
})();
