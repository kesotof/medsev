document.addEventListener('DOMContentLoaded', function() {
    inicializarHeader('header-container', '');
    const footer = new Footer();
    footer.render('#footer-container');
    const cart = new ShoppingCart();

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    const todosLosProductos = obtenerInventario();

    if (productId) {
        const producto = todosLosProductos.find(item => item.id === productId);
        if (producto) {
            mostrarDetalleProducto(producto);
        } else {
            document.querySelector('.main-container').innerHTML = `
                <div class="product-not-found">
                    <h1 class="page-title">Producto no encontrado</h1>
                    <p>El producto que buscas no existe o ha sido eliminado.</p>
                    <a href="../index.html" class="continue-shopping">Volver a la página principal</a>
                </div>`;
        }
    } else {
        window.location.href = '../index.html';
    }

    function mostrarDetalleProducto(producto) {
        const formatter = new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        });
        
        const estaAgotado = producto.cantidad <= 0;
        const botonClass = estaAgotado ? 'product-btn disabled' : 'product-btn';
        
        document.querySelector('.main-container').innerHTML = `
            <div class="product-detail">
                <div class="product-detail-container">
                    <div class="product-detail-left">
                        <div class="product-detail-image">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                        </div>
                    </div>
                    
                    <div class="product-detail-right">
                        <h1 class="product-detail-title">${producto.nombre}</h1>
                        <div class="product-detail-brand">Marca: <span>${producto.marca}</span></div>
                        
                        <div class="product-detail-price">${formatter.format(producto.precio)}</div>
                        
                        <div class="product-detail-stock">
                            ${estaAgotado ? 
                                '<span class="stock-agotado"><i class="fas fa-times-circle"></i> Agotado</span>' : 
                                `<span class="stock-disponible"><i class="fas fa-check-circle"></i> Stock disponible: ${producto.cantidad} unidades</span>`}
                        </div>
                        
                        <div class="product-actions">
                            <button class="${botonClass}" ${estaAgotado ? 'disabled' : ''} id="detail-add-to-cart">
                                <i class="fas fa-shopping-cart"></i> ${estaAgotado ? 'Agotado' : 'Añadir al Carrito'}
                            </button>
                        </div>
                        
                        <div class="product-detail-description">
                            <h3>Descripción</h3>
                            <p>${producto.descripcion || 'Sin descripción disponible'}</p>
                        </div>
                        
                        <div class="product-features">
                            <div class="feature">
                                <i class="fas fa-truck"></i>
                                <div>
                                    <h4>Envío a todo Chile</h4>
                                    <p>Recibe tu producto en 2 a 5 días hábiles</p>
                                </div>
                            </div>
                            
                            <div class="feature">
                                <i class="fas fa-shield-alt"></i>
                                <div>
                                    <h4>Garantía de calidad</h4>
                                    <p>Todos nuestros productos están certificados</p>
                                </div>
                            </div>
                            
                            <div class="feature">
                                <i class="fas fa-exchange-alt"></i>
                                <div>
                                    <h4>Política de devolución</h4>
                                    <p>30 días para cambios o devoluciones</p>
                                </div>
                            </div>
                        </div>
                        
                        <a href="javascript:history.back()" class="back-button">
                            <i class="fas fa-arrow-left"></i> Volver atrás
                        </a>
                    </div>
                </div>
            </div>
        `;

        if (!estaAgotado) {
            document.getElementById('detail-add-to-cart').addEventListener('click', function() {
                cart.addToCart(producto);
            });
        }

        document.title = `${producto.nombre} - MedSev`;
    }
});