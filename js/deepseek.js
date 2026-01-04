import getData from "./data.js";
// 1. Preload product data ONCE
let products = [];

// Fetch data during page initialization
async function initialize() {
  try {
    products = await getData();
  } catch (error) {
    console.error("Failed to load products", error);
  }
}
console.log(products)

// 2. Maintain cart state
const cart = new Map(); // {id: {item, quantity}}

// 3. Centralized cart update function
function updateCartUI(itemId, quantity) {
  const cartItem = cartList.querySelector(`#cart-item-${itemId}`);
  
  if (cartItem) {
    // Update existing item
    const countEl = cartItem.querySelector('.item-count');
    countEl.textContent = quantity;
  } else {
    // Add new item
    const item = cart.get(itemId);
    const li = document.createElement('li');
    li.id = `cart-item-${itemId}`;
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name}</span>
      <span class="item-count">1</span>
      <button class="remove-btn">Remove</button>
    `;
    cartList.appendChild(li);
  }
}

// 4. Optimized event handler
[trendCards, bestCards].forEach(container => {
  container.addEventListener("click", async (event) => {
    if (!event.target.classList.contains("cart-btn")) return;
    
    event.preventDefault();
    const card = event.target.closest('.card'); // More reliable than parentElement
    const itemId = card.id;
    
    // Find product in preloaded data
    const product = products.find(p => p.id === itemId);
    if (!product) return;

    // Update cart state
    const existing = cart.get(itemId);
    const newQuantity = existing ? existing.quantity + 1 : 1;
    
    cart.set(itemId, {
      ...product,
      quantity: newQuantity
    });

    // Update UI
    updateCartUI(itemId, newQuantity);
  });
});

// Initialize on page load
initialize();