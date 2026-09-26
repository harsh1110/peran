window.PERAN = window.PERAN || {};

(function () {
  var KEY = "peran-cart";

  function read() {
    try {
      var parsed = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(function (line) {
        return line && typeof line.id === "string" && typeof line.size === "string" && line.qty > 0;
      });
    } catch (error) {
      return [];
    }
  }

  function write(lines) {
    localStorage.setItem(KEY, JSON.stringify(lines));
    refreshBadge();
  }

  function count(lines) {
    return (lines || read()).reduce(function (sum, line) {
      return sum + line.qty;
    }, 0);
  }

  function refreshBadge() {
    var total = count();
    document.querySelectorAll("[data-cart-count]").forEach(function (node) {
      node.textContent = String(total);
    });
    document.querySelectorAll("[data-cart-link]").forEach(function (link) {
      link.setAttribute("aria-label", "Cart, " + total + (total === 1 ? " piece" : " pieces"));
    });
  }

  function add(id, size, qty) {
    var lines = read();
    var amount = Math.max(1, Math.min(5, qty || 1));
    var existing = lines.find(function (line) {
      return line.id === id && line.size === size;
    });
    if (existing) {
      existing.qty = Math.min(5, existing.qty + amount);
    } else {
      lines.push({ id: id, size: size, qty: amount });
    }
    write(lines);
    return lines;
  }

  function setQty(id, size, qty) {
    var lines = read().map(function (line) {
      if (line.id === id && line.size === size) {
        return { id: line.id, size: line.size, qty: Math.max(1, Math.min(5, qty)) };
      }
      return line;
    });
    write(lines);
    return lines;
  }

  function remove(id, size) {
    var lines = read().filter(function (line) {
      return !(line.id === id && line.size === size);
    });
    write(lines);
    return lines;
  }

  function clear() {
    write([]);
  }

  function subtotal(lines) {
    return (lines || read()).reduce(function (sum, line) {
      var product = PERAN.findProduct ? PERAN.findProduct(line.id) : null;
      if (!product) return sum;
      return sum + product.price * line.qty;
    }, 0);
  }

  PERAN.cart = {
    read: read,
    add: add,
    setQty: setQty,
    remove: remove,
    clear: clear,
    count: count,
    subtotal: subtotal,
    refreshBadge: refreshBadge
  };

  document.addEventListener("DOMContentLoaded", refreshBadge);
})();
