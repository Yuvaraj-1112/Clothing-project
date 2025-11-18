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
                <img style="width: 100px; height: 100px; border: none; border-radius 5px;" src="${item.image}" alt="${item.name}">
                 <div style="flex:1;
                             margin-left: 100px;">

                        <span style="font-size:20px; font-weight:500;">
                            ${item.name} 
                        </span>
                        <br>
                        <span style="font-size:17px; color:#555;">
                            ₹${item.price}
                        </span>
                    </div>
                     
                    <div style="flex: 1; margin-right:200px; margin-left: 50px; margin-bottom: 15px;">
                    <span style="font-size:20px; font-weight:500;">
                         Size: ${item.size}
                        </span>
                        </div>

                <div class="quantity-controls">
                    <button class="quantity-btn" data-index="${index}" data-action="decrease"
                            style="padding:6px 10px; font-size:18px; border:none;
                                   background:#ddd; border-radius:4px; cursor:pointer;">
                            -
                        </button>

                        <span style="font-size:16px; min-width:20px; text-align:center;">
                            ${item.quantity}
                        </span>

                        <button class="quantity-btn" data-index="${index}" data-action="increase"
                            style="padding:6px 10px; font-size:18px; border:none;
                                   background:#ddd; border-radius:4px; cursor:pointer;">
                            +
                        </button>
                </div>
                <button class="remove-btn" style="background-color: red;
                                                  color: white;   
                                                  padding: 8px 12px; 
                                                  cursor: pointer; 
                                                  border: none;
                                                  border-radius:5px;
                                                  margin-left: 400px;" 
                                                  data-index="${index}">Remove</button> `;

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
