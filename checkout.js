document.addEventListener('DOMContentLoaded', () => {
    const summaryItems = document.getElementById('summary-items');
    const summaryTotal = document.getElementById('summary-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    summaryItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.name} x${item.quantity}</span> <span>$${(item.price * item.quantity).toFixed(2)}</span>`;
        summaryItems.appendChild(li);
        total += item.price * item.quantity;
    });
    summaryTotal.textContent = total.toFixed(2);
});

function placeOrder() {
    const name = document.getElementById('cust-name').value;
    const address = document.getElementById('cust-address').value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = document.getElementById('summary-total').textContent;
    const orderRef = Math.floor(Math.random() * 10000); // Random Order ID

    if (!name || !address) {
        alert("Please fill in your name and address.");
        return;
    }

    // Build the item list text
    let itemDetails = cart.map(item => `- ${item.name} (${item.details})`).join('\n');

    const message = `ORDER #${orderRef}\nName: ${name}\nAddress: ${address}\nItems:\n${itemDetails}\nTOTAL: $${total}`;
    
    // Prepare the SMS link (Replace 1234567890 with your actual phone number)
    const smsLink = `sms:+1234567890?body=${encodeURIComponent(message)}`;
    
    const btn = document.getElementById('sms-owner-link');
    btn.href = smsLink;
    btn.style.display = "block";
    alert("Details saved! Now click the blue button to send your SMS.");
}

function finalizeOrder() {
    // Clear cart after sending SMS
    localStorage.removeItem('cart');
}
