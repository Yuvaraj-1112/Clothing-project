document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name} (Size: ${item.size}) - ₹${item.price} x </span>
                <div class="quantity-controls">
                    <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
        addEventListeners();
    }

    function addEventListeners() {
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                let index = e.target.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                loadCart();
            });
        });

        document.querySelectorAll(".quantity-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                let index = e.target.getAttribute("data-index");
                let action = e.target.getAttribute("data-action");

                if (action === "increase") {
                    cart[index].quantity++;
                } else if (action === "decrease" && cart[index].quantity > 1) {
                    cart[index].quantity--;
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                loadCart();
            });
        });
    }

    loadCart();
});
