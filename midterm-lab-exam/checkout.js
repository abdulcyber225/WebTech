const checkoutForm = document.querySelector(".checkout-form");

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const deliveryDate = new FormData(checkoutForm).get("delivery-date");
  const confirmationUrl = new URL("order-confirmation.html", window.location.href);
  confirmationUrl.searchParams.set("delivery-date", deliveryDate);
  localStorage.removeItem("threadStoreCart");
  window.location.assign(confirmationUrl);
});
