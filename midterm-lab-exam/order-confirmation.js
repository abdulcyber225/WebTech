const dateValue = new URLSearchParams(window.location.search).get("delivery-date");
const deliveryDate = document.querySelector("#delivery-date");

if (dateValue && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
  const parsedDate = new Date(`${dateValue}T00:00:00`);
  if (!Number.isNaN(parsedDate.getTime())) {
    deliveryDate.textContent = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(parsedDate);
  }
}
