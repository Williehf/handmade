document.addEventListener('DOMContentLoaded', () => {
    displayOrderSummary();
});

function displayOrderSummary() {
    const summaryItemsElement = document.getElementById('summary-items');
    const summaryTotalElement = document.getElementById('summary-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let grandTotal = 0;

    summaryItemsElement.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;
        li.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>$${itemTotal.toFixed(2)}</span>
        `;
        summaryItemsElement.appendChild(li);
    });

    summaryTotalElement.textContent = grandTotal.toFixed(2);
}
/*
function placeOrder() {
    // In a real application, you would send this data to your server via AJAX
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;

    if (!name || !address || !city || !zip) {
        alert("Please fill in all shipping details.");
        return;
    }
    setupSMSLink(name, address, city, zip);
    // Clear the cart after successful order placement
    localStorage.removeItem('cart');
    alert("Order placed successfully! Thank you for your purchase.");
    // Redirect the user to a confirmation page or the home page
    //window.location.href = 'collection.html'; 
}*/
function placeOrder() {
    // 1. Get field values
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zip = document.getElementById('zip').value.trim();

    // 2. Validate inputs
    if (!name || !address || !city || !zip) {
        alert("Please fill in all shipping details.");
        return;
    }

    // 3. Update the SMS link with all data
    setupSMSLink(name, address, city, zip);

    // 4. Clear cart and notify user
    localStorage.removeItem('cart');
    alert("Details captured! Now click the blue 'Send Order' button to open your SMS app.");
}
