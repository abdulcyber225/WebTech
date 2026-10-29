const storageKey = "threadStoreCart";
const productLimit = 5;

function readCart() {
  try {
    const savedItems = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(savedItems) ? savedItems : [];
  } catch {
    return [];
  }
}

const cartItems = readCart();
let nextCartItemId = cartItems.reduce((highestId, item) => Math.max(highestId, Number(item.id) || 0), 0) + 1;

const cartLink = document.querySelector(".cart-link");
const miniCart = document.querySelector("#mini-cart");
const miniCartItems = document.querySelector(".mini-cart-items");
const emptyMessage = document.querySelector(".mini-cart-empty");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.querySelector("#cart-total");
const quickAddDialog = document.querySelector(".quick-add-dialog");
const quickAddForm = document.querySelector(".quick-add-form");
let activeCard = null;

function saveCart() {
  localStorage.setItem(storageKey, JSON.stringify(cartItems));
}

function getProductCount(name) {
  return cartItems.filter((item) => item.name === name).length;
}

function addProduct(name, price, size, quantity) {
  const available = productLimit - getProductCount(name);
  const countToAdd = Math.min(quantity, available);

  for (let index = 0; index < countToAdd; index += 1) {
    cartItems.push({ id: nextCartItemId, name, price, size });
    nextCartItemId += 1;
  }

  saveCart();
  renderCart();
}

function renderCart() {
  if (miniCartItems) {
    miniCartItems.replaceChildren();

    cartItems.forEach((item) => {
      const row = document.createElement("li");
      row.className = "mini-cart-item";

      const name = document.createElement("span");
      name.textContent = `${item.name} (Size ${item.size})`;

      const price = document.createElement("strong");
      price.textContent = `$${item.price.toFixed(2)}`;

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.dataset.itemId = item.id;
      removeButton.textContent = "Remove";

      row.append(name, price, removeButton);
      miniCartItems.append(row);
    });
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  if (cartCount) cartCount.textContent = cartItems.length;
  if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
  if (emptyMessage) emptyMessage.hidden = cartItems.length > 0;

  document.querySelectorAll(".item").forEach((card) => {
    const productName = card.querySelector("h3").textContent.trim();
    const addButton = card.querySelector(".shop-btn");
    const quantity = getProductCount(productName);
    addButton.disabled = quantity >= productLimit;
    addButton.textContent = addButton.disabled ? "Limit reached" : "Add to Cart";
  });

  const productBuyButton = document.querySelector(".buy-box .shop-btn");
  if (productBuyButton) {
    const remaining = productLimit - getProductCount(document.querySelector(".product-page h1").textContent.trim());
    productBuyButton.disabled = remaining <= 0;
    document.querySelector("#quantity").max = Math.max(remaining, 1);
    productBuyButton.textContent = remaining <= 0 ? "Limit reached" : "Add to Cart";
  }
}

document.querySelectorAll(".item").forEach((card) => {
  const addButton = card.querySelector(".shop-btn");

  addButton.addEventListener("click", () => {
    activeCard = card;
    const name = card.querySelector("h3").textContent.trim();
    const remaining = productLimit - getProductCount(name);
    const quantityInput = document.querySelector("#quick-add-quantity");

    document.querySelector("#quick-add-title").textContent = name;
    document.querySelector(".quick-add-price").textContent = card.querySelector(".price").textContent;
    quantityInput.max = remaining;
    quantityInput.value = 1;
    document.querySelector("#quick-add-size").value = "";
    quickAddDialog.showModal();
  });
});

if (quickAddForm) {
  quickAddForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!activeCard || !quickAddForm.reportValidity()) return;

    const name = activeCard.querySelector("h3").textContent.trim();
    const price = Number(activeCard.querySelector(".price").textContent.replace(/[^0-9.]/g, ""));
    const size = document.querySelector("#quick-add-size").value;
    const quantity = Number(document.querySelector("#quick-add-quantity").value);
    addProduct(name, price, size, quantity);
    quickAddDialog.close();
    activeCard = null;
  });

  document.querySelector(".dialog-close").addEventListener("click", () => quickAddDialog.close());
}

const productBuyButton = document.querySelector(".buy-box .shop-btn");
if (productBuyButton) {
  productBuyButton.addEventListener("click", () => {
    const sizeInput = document.querySelector("#size");
    const quantityInput = document.querySelector("#quantity");
    if (!sizeInput.reportValidity() || !quantityInput.reportValidity()) return;

    const name = document.querySelector(".product-page h1").textContent.trim();
    const price = Number(document.querySelector(".buy-box .price").textContent.replace(/[^0-9.]/g, ""));
    const size = sizeInput.value;
    const quantity = Number(quantityInput.value);
    const remaining = productLimit - getProductCount(name);

    if (quantity >= 1 && quantity <= remaining) addProduct(name, price, size, quantity);
  });
}

if (cartLink && miniCart) {
  cartLink.addEventListener("click", (event) => {
    event.preventDefault();
    miniCart.hidden = !miniCart.hidden;
    cartLink.setAttribute("aria-expanded", String(!miniCart.hidden));
  });
}

if (miniCartItems) miniCartItems.addEventListener("click", (event) => {
  const removeButton = event.target.closest("button[data-item-id]");

  if (removeButton) {
    const itemIndex = cartItems.findIndex((item) => item.id === Number(removeButton.dataset.itemId));
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      saveCart();
      renderCart();
    }
  }
});

window.addEventListener("storage", (event) => {
  if (event.key === storageKey) {
    cartItems.splice(0, cartItems.length, ...(event.newValue ? JSON.parse(event.newValue) : []));
    renderCart();
  }
});

renderCart();