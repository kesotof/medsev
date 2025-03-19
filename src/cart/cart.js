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
                this.updateCartUI();
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
                        <img src="${item.imagen || '#'}" alt="${item.nombre || 'Producto'}">
                        <div>
                            <h4>${item.nombre || 'Producto'}</h4>
                            <p>${item.marca || ''}</p>
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

    updateCartUI() {
        const cartContainer = document.getElementById('cart-container');
        if (cartContainer) {
            cartContainer.innerHTML = this.generateCartHTML();
            this.attachCartEvents();
        }
    }

    attachCartEvents() {
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('tr').dataset.id);
                this.removeFromCart(productId);
            });
        });

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
                alert('¡Gracias por tu compra! Esta funcionalidad estará disponible próximamente.');
            });
        }
    }
}

window.ShoppingCart = ShoppingCart;