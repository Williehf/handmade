document.addEventListener('DOMContentLoaded', () => {
    displayOrderSummary();
});

function displayOrderSummary() {
    const summaryItemsElement = document.getElementById('summary-items');
    const summaryTotalElement = document.getElementById('summary-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let grandTotal = 0;

    summaryItemsElement.innerHTML = '';

    if (cart.length === 0) {
        summaryItemsElement.innerHTML = '<li>Your cart is empty</li>';
        summaryTotalElement.textContent = "0.00";
        return;
    }

    cart.forEach(item => {
        const li = document.createElement('li');
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;
        
        // We include the 'details' property to show colors in the summary
        li.innerHTML = `
            <div style="display:flex; flex-direction:column; width:100%;">
                <div style="display:flex; justify-content:space-between;">
                    <span><strong>${item.name}</strong> (x${item.quantity})</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                </div>
                <small style="color: #666;">${item.details || ''}</small>
            </div>
        `;
        summaryItemsElement.appendChild(li);
    });

    summaryTotalElement.textContent = grandTotal.toFixed(2);
}

function placeOrder() {
    // 1. Live capture of data from the screen
    const name = document.getElementById('cust-name')?.value.trim() || "";
    const addr = document.getElementById('cust-address')?.value.trim() || "";
    const city = document.getElementById('cust-city')?.value.trim() || "";
    const zip = document.getElementById('cust-zip')?.value.trim() || "";

    // 2. Validation
    if (!name || !addr || !city || !zip) {
        alert("Error: Please enter your Full Name, Address, City, and Zip Code.");
        return;
    }

    // 3. Get the order details including custom colors
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = document.getElementById('summary-total')?.innerText || "0.00";
    
    // Formatting the items for SMS including the color details
    const itemsList = cart.map(item => 
        `${item.name} (${item.details || 'No details'}) x${item.quantity}`
    ).join('\n');
                        
    const orderId = 'ORD-2026-' + Math.floor(Math.random() * 1000000);

    // 4. Build the message
    const message = `HANDMADE BY K - ORDER NOTICE\n` +
                    `Order ID: ${orderId}\n` +
                    `Customer: ${name}\n` +
                    `Address: ${addr}, ${city} ${zip}\n` +
                    `Items:\n${itemsList}\n` +
                    `Total: $${total}`;

    // 5. Update the SMS Link
    const ownerPhone = '+17874147255';
    const smsBtn = document.getElementById('sms-owner-link');
    
    // Encode message for SMS link
    smsBtn.href = `sms:${ownerPhone}?body=${encodeURIComponent(message)}`;
    
    // 6. Reveal the SMS button
    smsBtn.style.display = "inline-block";
    
    alert("Order details saved! Now click the blue button to send your SMS.");
}

function finalizeOrder() {
    // 1. Clear the cart data
    localStorage.removeItem('cart');
    
    // 2. Small delay to ensure the SMS app opens before the page changes
    setTimeout(function() {
        alert("Thank you for choosing Handmade by K (2026)!");
        // 3. Redirect to home page
        window.location.href = 'index.html';
    }, 1000); 
}

