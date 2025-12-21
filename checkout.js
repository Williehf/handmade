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
}
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
function placeOrder() {
    // 1. Capture elements safely
    const nameField = document.getElementById('name');
    const addrField = document.getElementById('address');
    const cityField = document.getElementById('city');
    const zipField = document.getElementById('zip');

    // 2. Check if the fields actually exist in HTML
    if (!nameField || !addrField || !cityField || !zipField) {
        console.error("Missing one or more input fields in HTML!");
        return;
    }

    // 3. Get the actual values
    const name = nameField.value.trim();
    const address = addrField.value.trim();
    const city = cityField.value.trim();
    const zip = zipField.value.trim();

    // 4. Validate
    if (!name || !address || !city || !zip) {
        alert("Please fill in all shipping details first.");
        return;
    }

    // 5. Update SMS link
    setupSMSLink(name, address, city, zip);
    alert("Details saved! You can now click the SMS button.");
}*/
function placeOrder() {
    // 1. Live capture of data from the screen
    const name = document.getElementById('cust-name')?.value || "";
    const addr = document.getElementById('cust-address')?.value || "";
    const city = document.getElementById('cust-city')?.value || "";
    const zip = document.getElementById('cust-zip')?.value || "";

    // 2. Debugging Check: If values are still empty, alert the user
    if (!name || !addr) {
        alert("Error: Please enter your Name and Address first.");
        return;
    }

    // 3. Get the order details from the summary area
    const total = document.getElementById('summary-total')?.innerText || "0.00";
    const itemsList = Array.from(document.querySelectorAll('#summary-items li'))
                           .map(li => li.innerText.trim())
                           .join(', ');
                        
const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);

    // 4. Build the message with line breaks
    const message = `ORDER NOTICE\n` +
                    `Order number: ${orderId}\n` +
                    `Customer: ${name}\n` +
                    `Address: ${addr}, ${city} ${zip}\n` +
                    `Items: ${itemsList}\n` +
                    `Total: $${total}`;

    // 5. Update the SMS Link
    
    const ownerPhone = '+17873741297';
    const smsBtn = document.getElementById('sms-owner-link');
    
    // Use encodeURIComponent to handle spaces and special characters
    smsBtn.href = `sms:${ownerPhone}?body=${encodeURIComponent(message)}`;
    
    // 6. Reveal the SMS button once it is ready
    smsBtn.style.display = "inline-block";
    
    alert("Order ready! 1-Click the 'Send SMS' button that just appeared.");

localStorage.removeItem('cart');
alert("Your Order is sucessfully send by SMS! Thank you for choice Handmade by Key.");
    // Redirect the user to a confirmation page or the home page
    //window.location.href = 'collection.html'; 
}









