class ShoppingCart {
    constructor() {
        this.cart = this.getCart();
        this.updateCartCounter();
    }

    getCart() {
        const storedCart = localStorage.getItem('medserverCart');
        return storedCart ? JSON.parse(storedCart) : [];
    }

    saveCart() {
        localStorage.setItem('medserverCart', JSON.stringify(this.cart));
        this.updateCartCounter();
    }

    addToCart(product) {
        if (!product.id) {
            product.id = Math.floor(Math.random() * 100000);
        }
    
        const existingProductIndex = this.cart.findIndex(item => item.id === product.id);
        
        if (existingProductIndex > -1) {
            if (this.cart[existingProductIndex].cantidadEnCarrito < product.cantidad) {
                this.cart[existingProductIndex].cantidadEnCarrito += 1;
                this.showNotification(`${product.nombre || 'Producto'} actualizado en el carrito`);
            } else {
                this.showNotification('No hay más stock disponible de este producto', 'error');
                return false;
            }
        } else {
            const cartProduct = { ...product, cantidadEnCarrito: 1 };
            this.cart.push(cartProduct);
            this.showNotification(`${product.nombre || 'Producto'} añadido al carrito`);
        }
        
        this.saveCart();
        
        return true;
    }

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
        this.showNotification('Producto eliminado del carrito');
        this.updateCartUI();
    }

    updateQuantity(id, quantity) {
        const productIndex = this.cart.findIndex(item => item.id === id);
        
        if (productIndex > -1) {
            const product = this.cart[productIndex];
            const maxStock = product.cantidad;
            
            if (quantity > 0 && quantity <= maxStock) {
                this.cart[productIndex].cantidadEnCarrito = quantity;
                this.saveCart();
                return true;
            } else if (quantity > maxStock) {
                this.showNotification(`Solo hay ${maxStock} unidades disponibles`, 'error');
                return false;
            }
        }
        return false;
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.showNotification('El carrito ha sido vaciado');
        this.updateCartUI();
    }

    calculateTotal() {
        return this.cart.reduce((total, item) => 
            total + (item.precio * item.cantidadEnCarrito), 0);
    }

    updateCartCounter() {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            let counter = document.querySelector('.cart-counter');
            const itemCount = this.cart.reduce((count, item) => count + item.cantidadEnCarrito, 0);
            
            if (!counter) {
                counter = document.createElement('span');
                counter.className = 'cart-counter';
                const parentLi = cartIcon.closest('.nav-item');
                if (parentLi) {
                    parentLi.appendChild(counter);
                } else {
                    cartIcon.parentElement.appendChild(counter);
                }
            }
            
            counter.textContent = itemCount;
            counter.style.display = itemCount > 0 ? 'block' : 'none';
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
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
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    toggleCartModal() {
        const cartModal = document.getElementById('cart-modal');
        const overlay = document.querySelector('.cart-modal-overlay');
        
        if (!cartModal) {
            console.error('Error: Modal del carrito no encontrado');
            return;
        }
        
        const currentDisplay = window.getComputedStyle(cartModal).display;
        
        if (currentDisplay === 'none') {
            console.log('Abriendo modal del carrito');
            this.updateCartModalContent();
            cartModal.style.cssText = 'display: block !important;';
            if (overlay) overlay.style.cssText = 'display: block !important;';
        } else {
            console.log('Cerrando modal del carrito');
            cartModal.style.cssText = 'display: none !important;';
            if (overlay) overlay.style.cssText = 'display: none !important;';
        }
    }

    updateCartModalContent() {
        const modalBody = document.querySelector('.cart-modal-body');
        const totalElement = document.getElementById('cart-modal-total-price');
        
        if (!modalBody || !totalElement) return;
        
        if (this.cart.length === 0) {
            modalBody.innerHTML = `<div class="cart-modal-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>`;
            totalElement.textContent = '$0';
            return;
        }
        
        const formatPrice = (price) => {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        };
        
        let cartItems = '';
        this.cart.forEach(item => {
            cartItems += `
                <div class="cart-modal-item" data-id="${item.id}">
                    <img src="${item.imagen || '#'}" alt="${item.nombre || 'Producto'}" class="cart-modal-item-image">
                    <div class="cart-modal-item-details">
                        <div class="cart-modal-item-name">${item.nombre || 'Producto'}</div>
                        <div class="cart-modal-item-price">$${formatPrice(item.precio)}</div>
                    </div>
                    <div class="cart-modal-item-actions">
                        <div class="cart-modal-item-quantity">
                            <button class="cart-modal-quantity-btn minus">-</button>
                            <input type="number" value="${item.cantidadEnCarrito}" min="1" max="${item.cantidad}" class="cart-modal-quantity-input">
                            <button class="cart-modal-quantity-btn plus">+</button>
                        </div>
                        <button class="cart-modal-item-remove">×</button>
                    </div>
                </div>
            `;
        });
        modalBody.innerHTML = cartItems;
        totalElement.textContent = `$${formatPrice(this.calculateTotal())}`;
        this.attachCartModalEvents();
    }

    attachCartModalEvents() {
        const minusButtons = document.querySelectorAll('.cart-modal-quantity-btn.minus');
        minusButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const item = e.target.closest('.cart-modal-item');
                const productId = parseInt(item.dataset.id);
                const input = item.querySelector('.cart-modal-quantity-input');
                
                if (input.value > 1) {
                    input.value = parseInt(input.value) - 1;
                    this.updateQuantity(productId, parseInt(input.value));
                    this.updateCartModalContent();
                }
            });
        });

        const plusButtons = document.querySelectorAll('.cart-modal-quantity-btn.plus');
        plusButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const item = e.target.closest('.cart-modal-item');
                const productId = parseInt(item.dataset.id);
                const input = item.querySelector('.cart-modal-quantity-input');
                
                input.value = parseInt(input.value) + 1;
                if (this.updateQuantity(productId, parseInt(input.value))) {
                    this.updateCartModalContent();
                } else {
                    input.value = parseInt(input.value) - 1;
                }
            });
        });
        
        const quantityInputs = document.querySelectorAll('.cart-modal-quantity-input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const item = e.target.closest('.cart-modal-item');
                const productId = parseInt(item.dataset.id);
                const newValue = parseInt(e.target.value);
                
                if (this.updateQuantity(productId, newValue)) {
                    this.updateCartModalContent();
                } else {
                    const product = this.cart.find(p => p.id === productId);
                    if (product) {
                        e.target.value = product.cantidadEnCarrito;
                    }
                }
            });
        });
        
        const removeButtons = document.querySelectorAll('.cart-modal-item-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const item = e.target.closest('.cart-modal-item');
                const productId = parseInt(item.dataset.id);
                this.removeFromCart(productId);
                this.updateCartModalContent();
            });
        });
    }

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
        
        const totalItems = this.cart.reduce((total, item) => total + item.cantidadEnCarrito, 0);
        const totalPrice = this.calculateTotal();

        let cartHTML = `
            <div class="cart-flex-container">
                <div class="cart-section">
                    <h2 class="cart-title">Mi carrito</h2>
        `;

        this.cart.forEach(item => {
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="product-image">
                        <img src="${item.imagen || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50%" x="50%" dy=".35em" text-anchor="middle" font-size="14" fill="%23333">Producto</text></svg>'}" alt="${item.nombre || 'Producto'}">
                    </div>
                    <div class="product-details">
                        <div class="product-brand">${item.marca || 'Marca'}</div>
                        <div class="product-name">${item.nombre || 'Producto'}</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">−</button>
                            <input type="number" value="${item.cantidadEnCarrito}" min="1" max="${item.cantidad}" class="quantity-input">
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>
                    <div class="price">${formatPrice(item.precio * item.cantidadEnCarrito)} CLP</div>
                    <button class="remove-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
        });

        cartHTML += `
                        </div>
                        <div class="summary-section">
                            <h2 class="summary-title">Resumen</h2>
                            <div class="product-count">${totalItems} producto${totalItems !== 1 ? 's' : ''}</div>
                            <div class="total-section">
                                <span>Total:</span>
                                <span>${formatPrice(totalPrice)} CLP</span>
                            </div>
                            <button class="checkout">Continuar con la compra</button>
                            <div class="cart-actions">
                                <button class="clear-cart">Vaciar carrito</button>
                            </div>
                            <a href="../index.html" class="continue-shopping">Continuar comprando</a>
                        </div>
                    </div>
                `;

                return cartHTML;
    }

    updateCartUI() {
        const cartContainer = document.getElementById('cart-container');
        if (cartContainer) {
            cartContainer.innerHTML = this.generateCartHTML();
            this.attachCartEvents();
        }
    }

    attachCartEvents() {
        // Corregido: cambiamos de 'tr' a '.cart-item'
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const item = e.target.closest('.cart-item');
                if (item) {
                    const productId = parseInt(item.dataset.id);
                    this.removeFromCart(productId);
                }
            });
        });

        const minusButtons = document.querySelectorAll('.quantity-btn.minus');
        const plusButtons = document.querySelectorAll('.quantity-btn.plus');
        const quantityInputs = document.querySelectorAll('.quantity-input');

        minusButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Corregido: cambiamos de 'tr' a '.cart-item'
                const item = e.target.closest('.cart-item');
                if (item) {
                    const productId = parseInt(item.dataset.id);
                    const input = item.querySelector('.quantity-input');
                    if (input && input.value > 1) {
                        input.value = parseInt(input.value) - 1;
                        if (this.updateQuantity(productId, parseInt(input.value))) {
                            this.updateCartUI(); // Actualizamos la UI después del cambio
                        }
                    }
                }
            });
        });

        plusButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Corregido: cambiamos de 'tr' a '.cart-item'
                const item = e.target.closest('.cart-item');
                if (item) {
                    const productId = parseInt(item.dataset.id);
                    const input = item.querySelector('.quantity-input');
                    if (input) {
                        const newValue = parseInt(input.value) + 1;
                        if (this.updateQuantity(productId, newValue)) {
                            this.updateCartUI(); // Actualizamos la UI después del cambio
                        }
                    }
                }
            });
        });

        quantityInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                // Corregido: cambiamos de 'tr' a '.cart-item'
                const item = e.target.closest('.cart-item');
                if (item) {
                    const productId = parseInt(item.dataset.id);
                    if (this.updateQuantity(productId, parseInt(e.target.value))) {
                        this.updateCartUI(); // Actualizamos la UI después del cambio
                    } else {
                        // Si falla (ej: fuera de stock), restauramos el valor anterior
                        const product = this.cart.find(p => p.id === productId);
                        if (product) {
                            e.target.value = product.cantidadEnCarrito;
                        }
                    }
                }
            });
        });

        const clearCartButton = document.querySelector('.clear-cart');
        if (clearCartButton) {
            clearCartButton.addEventListener('click', () => {
                if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
                    this.clearCart();
                }
            });
        }

        const checkoutButton = document.querySelector('.checkout');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                window.location.href = './checkout.html';
            });
        }
    }
}

window.ShoppingCart = ShoppingCart;

// Inicialización del carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();
    
    // Si estamos en la página del carrito, actualizar la UI
    if (document.getElementById('cart-container')) {
        cart.updateCartUI();
    }
    
    // Añadir listener para el icono del carrito
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cart.toggleCartModal();
        });
    }
});