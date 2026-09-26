window.PERAN = window.PERAN || {};

PERAN.categories = [
  { id: "all", label: "All" },
  { id: "bridal", label: "Bridal gowns" },
  { id: "groom", label: "Groom attire" },
  { id: "accessories", label: "Accessories" },
  { id: "decor", label: "Decor" }
];

PERAN.products = [
  {
    id: "ivory-zari",
    name: "The Ivory Zari Kurta",
    price: 7800,
    category: "groom",
    images: ["assets/products/ivory-zari.jpg"],
    alt: "Ivory festive kurta with gold zari, from the PERAN Instagram rail",
    description: "An ivory festive kurta with gold zari, photographed on the house’s Navratri rail. Prototype price for this preview."
  },
  {
    id: "noir-brocade",
    name: "The Noir Brocade Kurta",
    price: 8400,
    category: "groom",
    images: ["assets/products/noir-brocade.jpg"],
    alt: "Black and gold brocade kurta, from the PERAN Instagram rail",
    description: "Black ground with an all-over gold brocade, cut for garba nights and wedding evenings."
  },
  {
    id: "lattice-maroon",
    name: "The Lattice Maroon Kurta",
    price: 7200,
    category: "groom",
    images: ["assets/products/lattice-maroon.jpg"],
    alt: "Maroon kurta with a gold lattice and stole, from the PERAN Instagram rail",
    description: "Maroon silk with a gold lattice and a contrasting stole, from the designer kurta edit."
  },
  {
    id: "royal-blue",
    name: "The Royal Blue Kurta",
    price: 8900,
    category: "groom",
    images: ["assets/products/royal-blue.jpg"],
    alt: "Royal blue kurta with dense gold work, from the PERAN Instagram rail",
    description: "A deep royal ground with dense gold work. A statement piece from the current rail."
  },
  {
    id: "emerald-panel",
    name: "The Emerald Panel Kurta",
    price: 8200,
    category: "groom",
    images: ["assets/products/emerald-panel.jpg"],
    alt: "Emerald and gold panelled kurta, from the PERAN Instagram rail",
    description: "Emerald panels framed in gold, worn with a pale stole. For Navratri and wedding guest dressing."
  },
  {
    id: "pearl-thread",
    name: "The Pearl Thread Kurta",
    price: 6800,
    category: "groom",
    images: ["assets/products/pearl-thread.jpg"],
    alt: "Cream kurta with silver-white threadwork, from the PERAN Instagram rail",
    description: "Cream ground with silver-white threadwork for daytime rites and quieter ceremonies."
  },
  {
    id: "wine-silk",
    name: "The Wine Silk Kurta",
    price: 7600,
    category: "groom",
    images: ["assets/products/wine-silk.jpg"],
    alt: "Wine silk kurta with gold butis, from the PERAN Instagram rail",
    description: "Wine silk with gold butis, a deep tone close to the house burgundy."
  },
  {
    id: "garnet-sherwani",
    name: "The Garnet Sherwani Kurta",
    price: 9400,
    category: "groom",
    images: ["assets/products/garnet-sherwani.jpg"],
    alt: "Garnet sherwani-style kurta, from the PERAN Instagram rail",
    description: "Garnet kurta with a structured, sherwani-like placket. Indo-western from the wedding rail."
  },
  {
    id: "blackwork",
    name: "The Blackwork Kurta",
    price: 8600,
    category: "groom",
    images: ["assets/products/blackwork.jpg"],
    alt: "Black kurta with gold embroidery, from the PERAN Instagram rail",
    description: "Black with gold embroidery through the chest and cuffs. Evening groom dressing."
  },
  {
    id: "navy-zari",
    name: "The Navy Zari Kurta",
    price: 8100,
    category: "groom",
    images: ["assets/products/navy-zari.jpg"],
    alt: "Navy kurta with gold zari, from the PERAN Instagram rail",
    description: "Navy with a gold zari scatter, finished with a light stole."
  },
  {
    id: "plum-brocade",
    name: "The Plum Brocade Kurta",
    price: 7900,
    category: "groom",
    images: ["assets/products/plum-brocade.jpg"],
    alt: "Plum brocade kurta, from the PERAN Instagram rail",
    description: "Plum brocade for reception evenings, a richer cousin of the wine silk."
  },
  {
    id: "mirror-border",
    name: "The Mirror Border Kurta",
    price: 7300,
    category: "groom",
    images: ["assets/products/mirror-border.jpg"],
    alt: "Festive kurta with a mirror-work border, from the PERAN Instagram rail",
    description: "Festive kurta with a mirror-work border, for garba and the long Navratri nights."
  }
];

PERAN.sizes = ["S", "M", "L", "XL", "XXL"];

PERAN.escape = function (value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

PERAN.formatPrice = function (amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
};

PERAN.categoryLabel = function (id) {
  var match = PERAN.categories.find(function (category) {
    return category.id === id;
  });
  return match ? match.label : id;
};

PERAN.findProduct = function (id) {
  return PERAN.products.find(function (product) {
    return product.id === id;
  }) || null;
};
