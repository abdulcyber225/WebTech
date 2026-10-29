# Midterm Lab

Name: Abdul Hadi  
Registration number: FA24-BCS-107  
N: 7  
BP: 607px  
H: 49 degrees  
K: 4

## Changed files

- `index.html`: Added desktop and mobile category navigation, cart panel markup, and the listing-page script link.
- `product.html`: Added the shared mini-cart and required size/quantity validation to the detail-page add button.
- `styles.css`: Added the responsive mega-menu, checkout form, mini-cart, and accent styling.
- `checkout.html`: Added the HTML5-validated contact and delivery form.
- `checkout.js`: Routes a valid order to confirmation with only its delivery date and clears the submitted cart.
- `order-confirmation.html`, `order-confirmation.js`: Added the order success message, green check mark, and formatted delivery date.
- `script.js`: Added the size/quantity preview, persistent shared cart, badge, item limit, remove action, and total calculation.
- `README.md`: Recorded the midterm values, changed files, task notes, and AI disclosure.
- `evidence.html`: Assembled task screenshots and the added task code for PDF export.
- `FA24-BCS-107-midterm.pdf`: Submission report with screenshots and code under each task heading.
- `task1-375.png`, `task1-607.png`, `task1-1280.png`: Task 1 browser screenshots at the required widths.
- `task2-375.png`, `task2-607.png`, `task2-1280.png`: Task 2 browser screenshots at the required widths.
- `task3-375.png`, `task3-607.png`, `task3-1280.png`: Task 3 mini-cart screenshots at the required widths.

## Task 1 - Mega-menu

At 607px and wider, Shop by Category opens a four-column panel on hover or keyboard focus using `:focus-within`; focus leaving the item closes it.
Below 607px, a native `<details>` menu contains four independent category accordions. Every column is a semantic list with a visible heading.

## Task 2 - Checkout

`checkout.html` has Contact and Delivery fieldsets with linked labels, required fields, the `03XX-XXXXXXX` phone pattern, and delivery dates from 2026-10-29 through 2026-11-05. Its full-width action is Place Order.
After browser validation succeeds, `checkout.js` sends only the delivery date to the confirmation page and clears the submitted cart. The confirmation shows a green check and the formatted delivery date.

## Task 3 - Cart

`script.js` asks for size and quantity before adding a listing item, then saves cart entries in `localStorage` so they remain when opening the product detail page.
The shared badge and mini-cart show size, price, removal controls, and a `reduce()` total; each product remains limited to five entries across both pages.

## AI tools

GitHub Copilot was used to implement and test the changes. The implementation is plain HTML, CSS, and JavaScript; cart persistence uses browser `localStorage` only.
