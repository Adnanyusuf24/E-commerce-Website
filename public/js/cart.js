document.addEventListener('DOMContentLoaded', function() {
    if (!sessionStorage.getItem('cart')) {
        sessionStorage.setItem('cart', JSON.stringify([]));
    }

    updateCartUI(); // Update the cart UI when the page loads

    // Event delegation for handling clicks on dynamically created elements
    document.getElementById('cart').addEventListener('click', function(event) {
        const element = event.target;
        const productId = element.dataset.id;
        if (element.classList.contains('cart__close')) {
            document.getElementById('cart').style.display = 'none'; // Close cart
        } else if (element.classList.contains('increase')) {
            updateQuantity(productId, 'plus');
        } else if (element.classList.contains('decrease')) {
            updateQuantity(productId, 'minus');
        } else if (element.classList.contains('remove')) {
            removeFromCart(productId);
        }
    });
});

function addToCart(productId, productName, productPrice, productImage) {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    let cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            images: productImage,
            quantity: 1
        });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    const cartContainer = document.getElementById('cart');
    const html = cart.map(item => `
        <div class="cart__card">
            <div class="cart__box">
                <img src="/img/${item.images}" alt="${item.name}" class="cart__img">
            </div>
            <div class="cart__details">
                <h3 class="cart__title">${item.name}</h3>
                <span class="cart__price">$${(item.price * item.quantity).toFixed(2)}</span>
                <div class="cart__amount">
                    <button class="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                    <button class="remove" data-id="${item.id}">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    cartContainer.innerHTML = `
        <i class="bx bx-x cart__close"></i>
        <h2 class="cart__title-center">My Cart</h2>
        <div class="cart__container">${html}</div>
        <div class="cart__prices">
            <span class="cart__prices-item">${cart.length} item(s)</span>
            <span class="cart__prices-total">$${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
        </div>
    `;
}

function updateQuantity(productId, action) {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    let cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        if (action === 'plus') {
            cartItem.quantity++;
        } else if (action === 'minus' && cartItem.quantity > 1) {
            cartItem.quantity--;
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    cart = cart.filter(item => item.id !== productId);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}
