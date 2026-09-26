# PERAN — The Wedding House

A static prototype shop for PERAN, the wedding house in Memnagar, Ahmedabad. HTML, CSS, and vanilla JavaScript only. No build step.

## Pages

- Home, shop (filter and sort), product detail (`product.html?id=`), cart, checkout, about, contact
- Cart persists in `localStorage`
- Checkout and contact validate in the browser and show a confirmation. Nothing is posted and no payment is taken

## Photographs

Product frames are saved from the public Instagram [peran.in](https://www.instagram.com/peran.in/) (latest kurta carousels). They are files in `assets/products/`, not hotlinked CDN URLs. The wordmark file is `assets/logo.jpg`; the header also draws PERAN in CSS so it stays sharp.

Prices and piece names are prototype copy. The palette is sampled from the logo: burgundy `#6e1d1c`, `#741e1f`, `#541412`, with ivory and white type.

## Local preview

Open the folder with any static server, for example:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173/`.
