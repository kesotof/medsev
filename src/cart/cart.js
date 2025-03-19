class ShoppingCart {
    constructor() {
        this.cart = this.getCart();
        this.updateCartCounter();
    }

    // Obtener el carrito desde localStorage
    getCart() {
        const storedCart = localStorage.getItem('medserverCart');
        return storedCart ? JSON.parse(storedCart) : [];
    }

    // Guardar el carrito en localStorage
    saveCart() {
        localStorage.setItem('medserverCart', JSON.stringify(this.cart));
        this.updateCartCounter();
    }

    // Añadir producto al carrito
    addToCart(product) {
        const existingProductIndex = this.cart.findIndex(item => item.id === product.id);
        
        if (existingProductIndex > -1) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            if (this.cart[existingProductIndex].cantidadEnCarrito < product.cantidad) {
                this.cart[existingProductIndex].cantidadEnCarrito += 1;
                this.showNotification('Producto actualizado en el carrito');
            } else {
                this.showNotification('No hay más stock disponible de este producto', 'error');
                return false;
            }
        } else {
            // Si el producto no está en el carrito, añadirlo con cantidad 1
            const cartProduct = { ...product, cantidadEnCarrito: 1 };
            this.cart.push(cartProduct);
            this.showNotification('Producto añadido al carrito');
        }
        
        this.saveCart();
        return true;
    }

    // Eliminar producto del carrito
    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
        this.showNotification('Producto eliminado del carrito');
        this.updateCartUI();
    }

    // Actualizar cantidad de un producto
    updateQuantity(id, quantity) {
        const productIndex = this.cart.findIndex(item => item.id === id);
        
        if (productIndex > -1) {
            const product = this.cart[productIndex];
            const maxStock = product.cantidad;
            
            if (quantity > 0 && quantity <= maxStock) {
                this.cart[productIndex].cantidadEnCarrito = quantity;
                this.saveCart();
                this.updateCartUI();
                return true;
            } else if (quantity > maxStock) {
                this.showNotification(`Solo hay ${maxStock} unidades disponibles`, 'error');
                return false;
            }
        }
        return false;
    }

    // Vaciar el carrito
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.showNotification('El carrito ha sido vaciado');
        this.updateCartUI();
    }

    // Calcular el total del carrito
    calculateTotal() {
        return this.cart.reduce((total, item) => 
            total + (item.precio * item.cantidadEnCarrito), 0);
    }

    // Actualizar el contador del carrito en el header
    updateCartCounter() {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            // Crear o actualizar el contador
            let counter = document.querySelector('.cart-counter');
            const itemCount = this.cart.reduce((count, item) => count + item.cantidadEnCarrito, 0);
            
            if (!counter) {
                counter = document.createElement('span');
                counter.className = 'cart-counter';
                cartIcon.parentElement.appendChild(counter);
            }
            
            counter.textContent = itemCount;
            counter.style.display = itemCount > 0 ? 'block' : 'none';
        }
    }

    // Mostrar una notificación
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        // Estilo para la notificación
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '4px';
        notification.style.color = 'white';
        notification.style.zIndex = '1000';
        
        if (type === 'success') {
            notification.style.backgroundColor = '#4CAF50';
        } else {
            notification.style.backgroundColor = '#F44336';
        }
        
        // Eliminar la notificación después de 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Generar HTML para el modal del carrito
    generateCartHTML() {
        if (this.cart.length === 0) {
            return `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart cart-empty-icon"></i>
                    <p>Tu carrito está vacío</p>
                    <a href="../index.html" class="continue-shopping">Continuar comprando</a>
                </div>
            `;
        }

        const formatPrice = (price) => {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        };

        let cartHTML = `
            <div class="cart-items">
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        this.cart.forEach(item => {
            cartHTML += `
                <tr data-id="${item.id}">
                    <td class="product-info">
                        <img src="${item.imagen}" alt="${item.nombre}">
                        <div>
                            <h4>${item.nombre}</h4>
                            <p>${item.marca}</p>
                        </div>
                    </td>
                    <td class="product-price">$${formatPrice(item.precio)}</td>
                    <td class="product-quantity">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" value="${item.cantidadEnCarrito}" min="1" max="${item.cantidad}" class="quantity-input">
                        <button class="quantity-btn plus">+</button>
                    </td>
                    <td class="product-subtotal">$${formatPrice(item.precio * item.cantidadEnCarrito)}</td>
                    <td class="product-remove">
                        <button class="remove-btn"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });

        cartHTML += `
                    </tbody>
                </table>
            </div>
            <div class="cart-summary">
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>$${formatPrice(this.calculateTotal())}</span>
                </div>
                <div class="cart-actions">
                    <button class="clear-cart">Vaciar Carrito</button>
                    <button class="checkout">Proceder al Pago</button>
                </div>
                <a href="../index.html" class="continue-shopping">Continuar comprando</a>
            </div>
        `;

        return cartHTML;
    }

    // Actualizar la interfaz del carrito
    updateCartUI() {
        const cartContainer = document.getElementById('cart-container');
        if (cartContainer) {
            cartContainer.innerHTML = this.generateCartHTML();
            this.attachCartEvents();
        }
    }

    // Adjuntar eventos a los elementos del carrito
    attachCartEvents() {
        // Botones de eliminar producto
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('tr').dataset.id);
                this.removeFromCart(productId);
            });
        });

        // Botones de cambio de cantidad
        const minusButtons = document.querySelectorAll('.quantity-btn.minus');
        const plusButtons = document.querySelectorAll('.quantity-btn.plus');
        const quantityInputs = document.querySelectorAll('.quantity-input');

        minusButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                const productId = parseInt(row.dataset.id);
                const input = row.querySelector('.quantity-input');
                if (input.value > 1) {
                    input.value = parseInt(input.value) - 1;
                    this.updateQuantity(productId, parseInt(input.value));
                }
            });
        });

        plusButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                const productId = parseInt(row.dataset.id);
                const input = row.querySelector('.quantity-input');
                input.value = parseInt(input.value) + 1;
                this.updateQuantity(productId, parseInt(input.value));
            });
        });

        quantityInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const row = e.target.closest('tr');
                const productId = parseInt(row.dataset.id);
                this.updateQuantity(productId, parseInt(e.target.value));
            });
        });

        // Botón de vaciar carrito
        const clearCartButton = document.querySelector('.clear-cart');
        if (clearCartButton) {
            clearCartButton.addEventListener('click', () => {
                if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
                    this.clearCart();
                }
            });
        }

        // Botón de checkout
        const checkoutButton = document.querySelector('.checkout');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                alert('¡Gracias por tu compra! Esta funcionalidad estará disponible próximamente.');
            });
        }
    }
}

// Exportar la clase para que esté disponible globalmente
window.ShoppingCart = ShoppingCart;