document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});

function displayCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const grandTotalElement = document.getElementById('grand-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let grandTotal = 0;

    cartItemsElement.innerHTML = ''; // Clear previous display

    cart.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" width="50"> ${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><span class="remove-item" data-id="${item.id}">Remove</span></td>
        `;
        cartItemsElement.appendChild(row);
    });

    grandTotalElement.textContent = grandTotal.toFixed(2);
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemId = event.target.getAttribute('data-id');
            removeFromCart(itemId);
        });
    });
}

function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Re-render the cart
}
