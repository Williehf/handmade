/*document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const product = {
                id: productCard.getAttribute('data-id'),
                name: productCard.getAttribute('data-name'),
                price: parseFloat(productCard.getAttribute('data-price')),
                image: productCard.getAttribute('data-image'),
                quantity: 1
            };
            addToCart(product);
            updateCartCount();
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const stockDisplay = card.querySelector('.stock-display');
            let currentStock = parseInt(card.getAttribute('data-stock'));

            if (currentStock > 0) {
                // Reduce stock by 1
                currentStock--;
                
                // Update the HTML
                card.setAttribute('data-stock', currentStock);
                stockDisplay.textContent = currentStock;

                // If stock hits 0, disable the button
                if (currentStock === 0) {
                    e.target.disabled = true;
                    e.target.textContent = "Out of Stock";
                    e.target.style.backgroundColor = "#ccc";
                }
            }
        });
    });
});



function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = count;
}

//Add link to the Google Sheet
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwl-mGIVArNe89Pv20bwbSTy9e5KW001Q7ohTMd-aYOqqSnBpRLcWkRV5PPGOc6Wwit/exec';

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', async (e) => {
        const card = e.target.closest('.product-card');
        const productId = card.getAttribute('data-id');

        // Disable button while processing
        button.disabled = true;
        button.textContent = "Updating...";

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify({ id: productId })
            });
            const result = await response.json();

            if (result.status === "success") {
                card.querySelector('.stock-display').textContent = result.newStock;
                button.textContent = "Added!";
                button.disabled = false;
            } else {
                button.textContent = "Sold Out";
            }
        } catch (error) {
            console.error("Inventory error:", error);
            button.textContent = "Error";
            button.disabled = false;
        }
    });
});*/
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwl-mGIVArNe89Pv20bwbSTy9e5KW001Q7ohTMd-aYOqqSnBpRLcWkRV5PPGOc6Wwit/exec';

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    // OPTIONAL: Add a function here to fetch initial stock from Google on load
});

// ONE unified listener for all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', async (e) => {
        const card = e.target.closest('.product-card');
        const productId = card.getAttribute('data-id');
        const stockDisplay = card.querySelector('.stock-display');
        
        // 1. Disable button immediately to prevent double-clicks
        button.disabled = true;
        const originalText = button.textContent;
        button.textContent = "Checking Stock...";

        try {
            // 2. Update Google Sheets first (The "Source of Truth")
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify({ id: productId })
            });
            const result = await response.json();

            if (result.status === "success" && result.newStock >= 0) {
                // 3. Update the HTML display with the REAL stock from Google
                stockDisplay.textContent = result.newStock;
                card.setAttribute('data-stock', result.newStock);

                // 4. Run your local cart logic ONLY if stock was successfully reduced
                const product = {
                    id: productId,
                    name: card.getAttribute('data-name'),
                    price: parseFloat(card.getAttribute('data-price')),
                    image: card.getAttribute('data-image'),
                    quantity: 1
                };
                addToCart(product);
                updateCartCount();

                // 5. Final button state
                if (result.newStock === 0) {
                    button.textContent = "Out of Stock";
                    button.style.backgroundColor = "#ccc";
                    button.disabled = true;
                } else {
                    button.textContent = "Added!";
                    setTimeout(() => {
                        button.textContent = "Add to Cart";
                        button.disabled = false;
                    }, 1000);
                }
            } else {
                // If Google says no stock available
                button.textContent = "Sold Out";
                button.disabled = true;
                stockDisplay.textContent = "0";
            }
        } catch (error) {
            console.error("Inventory error:", error);
            button.textContent = "Error";
            button.disabled = false;
        }
    });
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) return; // Prevent errors if element doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = count;
}

// Function to fetch live stock when page loads or refreshes
async function syncLiveStock() {
    try {
        // Send a GET request to your script (ensure your Google Script has a doGet function)
        const response = await fetch(GOOGLE_SCRIPT_URL + "?action=getInventory");
        const result = await response.json();

        if (result.status === "success") {
            result.data.forEach(item => {
                const card = document.querySelector(`.product-card[data-id="${item.id}"]`);
                if (card) {
                    const display = card.querySelector('.stock-display');
                    const btn = card.querySelector('.add-to-cart');
                    
                    // Update display and internal data attribute
                    display.textContent = item.stock;
                    card.setAttribute('data-stock', item.stock);

                    // Disable button if live stock is 0
                    if (parseInt(item.stock) <= 0) {
                        btn.disabled = true;
                        btn.textContent = "Out of Stock";
                    }
                }
            });
        }
    } catch (error) {
        console.error("Initial sync failed:", error);
    }
}

// Run this automatically on page load
document.addEventListener('DOMContentLoaded', syncLiveStock);

