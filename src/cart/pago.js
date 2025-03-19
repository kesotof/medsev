document.addEventListener('DOMContentLoaded', function() {

    const cart = new ShoppingCart();
    const cartItems = cart.getCart();
    const orderSummary = document.getElementById('order-summary');
    
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    if (cartItems.length === 0) {
        orderSummary.innerHTML = `
            <div class="empty-cart-message">
                <p>Debes agregar productos antes de continuar con el pago.</p>
                <button class="back-to-cart" onclick="window.location.href='carrito.html'">Volver al carrito</button>
            </div>
        `;
        document.querySelector('.payment-section').style.display = 'none';
    } else {
        let productsHTML = '';
        let totalAmount = 0;
        
        cartItems.forEach(item => {
            const itemTotal = item.precio * item.cantidadEnCarrito;
            totalAmount += itemTotal;
            
            productsHTML += `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${item.imagen}" alt="${item.nombre}">
                    </div>
                    <div class="product-info">
                        <div class="product-title">${item.nombre}</div>
                        <div class="product-details">Cantidad: ${item.cantidadEnCarrito}</div>
                        <div class="product-price">$${formatPrice(itemTotal)}</div>
                    </div>
                </div>
            `;
        });
        
        orderSummary.innerHTML = `
            ${productsHTML}
            <div class="total-section">
                <div class="total-row">
                    <div>Total:</div>
                    <div>$${formatPrice(totalAmount)}</div>
                </div>
                <button class="continue-button" id="continue-button" disabled>Continuar</button>
                <button class="back-to-cart" onclick="window.location.href='carrito.html'">Volver al carrito</button>
                <div class="terms-text">
                    Al hacer clic en "Continuar", declaro que he leído y aceptado los 
                    <a href="#">Términos y condiciones</a>, al igual que la 
                    <a href="#">Política de privacidad</a>.
                </div>
            </div>
        `;
        
        const webpayMethod = document.getElementById('webpay-method');
        const creditCardMethod = document.getElementById('credit-card-method');
        const continueButton = document.getElementById('continue-button');
        
        const webpayName = document.getElementById('webpay-name');
        const webpayRut = document.getElementById('webpay-rut');
        const webpayEmail = document.getElementById('webpay-email');
        
        const cardNumber = document.getElementById('card-number');
        const cardName = document.getElementById('card-name');
        const cardExpiry = document.getElementById('card-expiry');
        const cardCvv = document.getElementById('card-cvv');
        
        let activeMethod = null;
        
        function setActiveMethod(method) {
            if (activeMethod) {
                activeMethod.classList.remove('active');
            }
            
            method.classList.add('active');
            activeMethod = method;
            
            continueButton.disabled = true;
        }
        
        webpayMethod.addEventListener('click', function() {
            setActiveMethod(webpayMethod);
            validateWebpayForm();
        });
        
        creditCardMethod.addEventListener('click', function() {
            setActiveMethod(creditCardMethod);
            validateCardForm();
        });
        
        [webpayName, webpayRut, webpayEmail].forEach(input => {
            input.addEventListener('input', validateWebpayForm);
        });
        
        function validateWebpayForm() {
            if (activeMethod !== webpayMethod) return;
            
            if (webpayName.value && webpayRut.value && webpayEmail.value) {
                continueButton.disabled = false;
            } else {
                continueButton.disabled = true;
            }
        }

        [cardNumber, cardName, cardExpiry, cardCvv].forEach(input => {
            input.addEventListener('input', validateCardForm);
        });
        
        function validateCardForm() {
            if (activeMethod !== creditCardMethod) return;
            
            if (cardNumber.value && cardName.value && cardExpiry.value && cardCvv.value) {
                continueButton.disabled = false;
            } else {
                continueButton.disabled = true;
            }
        }
        
        continueButton.addEventListener('click', function() {
            continueButton.disabled = true;
            continueButton.textContent = 'Procesando...';
            const productosComprados = JSON.stringify(cartItems);
            localStorage.setItem('productosComprados', productosComprados);
        
            setTimeout(() => {
                cart.clearCart();
                setTimeout(() => {
                    window.location.href = 'finalizado.html';
                }, 2000);
            }, 1500);
        });
    }
});