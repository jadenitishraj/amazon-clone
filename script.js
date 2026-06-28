// Amazon Clone storefront — product data + add-to-cart interaction.
// Built by the AI Squad Full-Stack Engineer.

const PRODUCTS = [
  { id: 1, title: "Wireless Noise-Cancelling Headphones", price: 7999, rating: 4.5, reviews: 1284,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { id: 2, title: "Smart Watch Series 7 — Fitness Tracker", price: 12999, rating: 4.0, reviews: 842,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  { id: 3, title: "Mechanical Keyboard RGB Backlit", price: 5499, rating: 4.5, reviews: 2310,
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80" },
  { id: 4, title: "4K Action Camera Waterproof", price: 8999, rating: 4.0, reviews: 531,
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80" },
  { id: 5, title: "Portable Bluetooth Speaker", price: 2999, rating: 5.0, reviews: 3922,
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80" },
  { id: 6, title: "Ergonomic Wireless Mouse", price: 1799, rating: 4.5, reviews: 1765,
    img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80" },
];

let cartCount = 0;

function formatPrice(cents) {
  const dollars = Math.floor(cents / 100);
  const rest = String(cents % 100).padStart(2, "0");
  return { dollars: dollars.toLocaleString(), rest };
}

function stars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - (half ? 1 : 0));
}

function renderProducts(list) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";
  list.forEach((p) => {
    const price = formatPrice(p.price);
    const card = document.createElement("article");
    card.className = "product";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" loading="lazy" />
      <div class="product-title">${p.title}</div>
      <div class="product-rating">${stars(p.rating)}<span class="count">${p.reviews.toLocaleString()}</span></div>
      <div class="product-price"><sup>$</sup>${price.dollars}<sup>${price.rest}</sup></div>
      <button class="add-btn" data-id="${p.id}">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

function addToCart() {
  cartCount += 1;
  document.getElementById("cart-count").textContent = String(cartCount);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(PRODUCTS);

  document.getElementById("product-grid").addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn")) addToCart();
  });

  const search = document.getElementById("search-input");
  search.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    renderProducts(q ? PRODUCTS.filter((p) => p.title.toLowerCase().includes(q)) : PRODUCTS);
  });
});
