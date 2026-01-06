document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});

function displayCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const grandTotalElement = document.getElementById('grand-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let grandTotal = 0;

    cartItemsElement.innerHTML = ''; 

    cart.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        row.innerHTML = `
            <td data-label="Product">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${item.image}" width="50">
                    <div style="text-align: left;">
                        <strong>${item.name}</strong><br>
                        <small style="color: #666;">${item.details || ''}</small>
                    </div>
                </div>
            </td>
            <td data-label="Price">$${item.price.toFixed(2)}</td>
            <td data-label="Quantity">${item.quantity}</td>
            <td data-label="Total">$${itemTotal.toFixed(2)}</td>
            <td><button class="remove-item" onclick="removeFromCart('${item.id}')" style="color:red; background:none; border:none; cursor:pointer;">Remove</button></td>
        `;
        cartItemsElement.appendChild(row);
    });

    grandTotalElement.textContent = grandTotal.toFixed(2);
}

function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Filter out the item (comparing as strings to be safe)
    cart = cart.filter(item => item.id.toString() !== itemId.toString());
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}
