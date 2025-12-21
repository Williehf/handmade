document.addEventListener('DOMContentLoaded', () => {
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
});
