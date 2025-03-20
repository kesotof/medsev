/**
 * Función para cargar dinámicamente el header de MedServer en cualquier página
 * @param {string} targetElementId - ID del elemento donde se insertará el header (opcional, por defecto 'header-container')
 * @param {string} activeSection - Nombre de la sección activa para resaltarla (opcional)
 */
function cargarHeader(targetElementId = 'header-container', activeSection = '') {
  const container = document.getElementById(targetElementId);
  if (!container) {
    console.error(`El elemento con ID '${targetElementId}' no existe en el documento.`);
    return;
  }

  const headerStyles = document.createElement('style');
  headerStyles.textContent = `
    .navbar-brand {
      color: #007bff;
      font-weight: bold;
      font-size: 1.8rem;
    }
    .top-navbar {
      padding: 15px 0;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .top-navbar .container-fluid {
      max-width: 1400px;
      margin: 0 auto;
    }
    .search-container {
      display: flex;
      align-items: center;
    }
    .search-container input[type="text"] {
      border-radius: 20px;
      padding: 0.7rem 1.2rem;
      margin-right: 0.5rem;
      min-width: 500px;
    }
    .search-container button {
      background-color: transparent;
      border: none;
      color: #007bff;
      margin-right: 2.5rem;
      font-size: 1.2rem;
    }
    .nav-link {
      color: white;
    }
    .nav-link:focus,
    .nav-link:active,
    .nav-link.show {
      outline: none !important;
      box-shadow: none !important;
      border: none !important;
    }
    .dropdown-menu {
      background-color: #007bff;
      border: none;
    }
    .dropdown-item {
      color: white;
      display: flex;
      align-items: center;
    }
    .dropdown-item:hover {
      background-color: #0056b3;
    }
    .cart-icon {
      color: #007bff;
      font-size: 1.8rem;
      margin-left: 2.5rem; 
    }
    .location-icon {
      color: red;
      font-size: 1.8rem;
      margin-left: 4.5rem;
    }

    .nav-item.sucursales {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .sucursal-enlace {
      color: #007bff !important;
      display: flex;
      align-items: center;
      gap: 5px;
      text-decoration: none;
      cursor: pointer;
    }
    
    .lista-sucursales {
      display: none;
      position: absolute;
      top: 35px;
      left: 70%;
      transform: translateX(-50%);
      z-index: 1000;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      width: 240px;
      padding: 12px;
    }
    
    .sucursal-item {
      list-style-type: none;
      padding: 10px;
      display: flex;
      align-items: center;
      border-radius: 6px;
      transition: background-color 0.2s;
      margin-bottom: 5px;
    }
    
    .sucursal-item:hover {
      background-color: #f0f8ff;
    }
    
    .sucursal-item i {
      color: black;
      font-size: 18px;
      margin-right: 10px;
    }
    
    .info-sucursal {
      display: flex;
      flex-direction: column;
    }
    
    .nombre-sucursal-hover {
      color: #007bff;
      font-weight: bold;
      font-size: 16px;
    }
    
    .direccion-hover {
      color: #333;
      font-size: 14px;
      margin-top: 2px;
    }
    
    .sucursal-link {
      text-decoration: none;
      color: inherit;
      display: flex;
      align-items: center;
      width: 100%;
    }
    
    .sucursal-link:hover {
      color: inherit;
    }
    
    .navbar-nav {
      align-items: center;
    }
    
    .nav-item {
      display: flex;
      align-items: center;
    }

    /* Estilos para el catálogo */
    .bg-primary {
      position: relative;
    }
    
    .catalogo-nav {
      display: flex;
      width: 100%;
      justify-content: center;
      padding: 0;
      margin: 0;
    }
    
    .catalogo-item {
      position: relative;
      list-style: none;
      padding: 15px 25px;
      color: white;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.3s;
    }
    
    .catalogo-item:hover {
      background-color: #0056b3;
    }
    
    .submenu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      width: 250px;
      background-color: white;
      box-shadow: 0 6px 12px rgba(0,0,0,0.175);
      z-index: 1000;
      border-radius: 0 0 4px 4px;
      padding: 10px 0;
    }
    
    .catalogo-item:hover .submenu {
      display: block;
    }
    
    .submenu-item {
      padding: 12px 20px;
      color: #333;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
      text-decoration: none;
    }
    
    .submenu-item:hover {
      background-color: #f0f8ff;
      color: #007bff;
    }
    
    .submenu-item i {
      margin-right: 10px;
      color: #007bff;
    }
    
    .catalogo-item.active {
      background-color: #0056b3;
    }
    .cart-counter {
      position: absolute;
      top: -8px;
      right: -3px;
      background-color: #ff5722;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      text-indent: 4px;
    }

    /* Estilos para el modal del carrito */
    .cart-modal {
      display: none;
      position: absolute;
      right: 20px;
      top: 60px;
      z-index: 1000;
      max-width: 400px;
      width: 90%;
      background-color: white;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      border-radius: 8px;
      overflow: hidden;
    }
    
    .cart-modal-content {
      display: flex;
      flex-direction: column;
      max-height: 80vh;
    }
    
    .cart-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #eee;
      background-color: #f8f8f8;
    }
    
    .cart-modal-header h3 {
      margin: 0;
      font-size: 18px;
      color: #333;
    }
    
    .cart-modal-close {
      font-size: 24px;
      cursor: pointer;
      color: #888;
    }
    
    .cart-modal-close:hover {
      color: #333;
    }
    
    .cart-modal-body {
      padding: 15px;
      overflow-y: auto;
      max-height: 300px;
    }
    
    .cart-modal-empty {
      text-align: center;
      padding: 20px;
      color: #888;
    }
    
    .cart-modal-item {
      display: flex;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    
    .cart-modal-item:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
    
    .cart-modal-item-image {
      width: 60px;
      height: 60px;
      object-fit: contain;
      border: 1px solid #eee;
      padding: 5px;
      border-radius: 4px;
    }
    
    .cart-modal-item-details {
      flex-grow: 1;
      padding: 0 10px;
    }
    
    .cart-modal-item-name {
      font-size: 14px;
      margin-bottom: 5px;
      font-weight: 500;
      color: #333;
    }
    
    .cart-modal-item-price {
      font-size: 14px;
      color: #666;
    }
    
    .cart-modal-item-actions {
      display: flex;
      align-items: center;
    }
    
    .cart-modal-item-quantity {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
    
    .cart-modal-quantity-btn {
      background-color: #f0f0f0;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
    
    .cart-modal-quantity-input {
      width: 30px;
      text-align: center;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 0 5px;
      padding: 3px 0;
    }
    
    .cart-modal-item-remove {
      color: #ff5722;
      cursor: pointer;
      font-size: 18px;
      background: none;
      border: none;
      padding: 0;
    }
    
    .cart-modal-footer {
      padding: 15px;
      background-color: #f8f8f8;
      border-top: 1px solid #eee;
    }
    
    .cart-modal-total {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      font-weight: 600;
      font-size: 16px;
    }
    
    .cart-modal-buttons {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }
    
    .cart-modal-buttons button {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
    }
    
    .continue-shopping-btn {
      background-color: #f5f5f5;
      color: #333;
    }
    
    .view-cart-btn {
      background-color: #3483fa;
      color: white;
    }
    
    .continue-shopping-btn:hover {
      background-color: #e0e0e0;
    }
    
    .view-cart-btn:hover {
      background-color: #2968c8;
    }
    
    .cart-modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      background-color: rgba(0,0,0,0.1);
      pointer-events: auto;
    }
  `;

  document.head.appendChild(headerStyles);

  function cargarImagen(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => reject();
      img.src = src;
    });
  }

  function obtenerRutaLogo() {
    const rutas = ['image/logo.png', '../image/logo.png'];
    const verificarRuta = (ruta) => {
      return cargarImagen(ruta)
        .then(() => ruta)
        .catch(() => null);
    };
    return Promise.all(rutas.map(verificarRuta))
      .then(resultados => {
        const rutaValida = resultados.filter(ruta => ruta !== null)[0];
        return rutaValida || 'image/logo.png';
      });
  }

  const crearHeaderHTML = (logoSrc) => {
    const baseUrl = window.location.pathname.split('/').slice(0, -1).join('/') || '/';
    
    let indexPath;
    if (baseUrl.endsWith('src')) {
      indexPath = 'index.html';
    } else {
      indexPath = '../index.html';
    }
    
    let sucursalesPath;
    if (baseUrl.endsWith('src')) {
      sucursalesPath = 'pages/sucursales.html';
    } else {
      sucursalesPath = '../pages/sucursales.html';
    }

    return `
      <nav class="navbar navbar-expand-lg top-navbar">
        <div class="container-fluid">
          <a class="navbar-brand" href="${indexPath}">
            <img src="${logoSrc}" alt="logo" width="150" height="70" class="d-inline-block align-text-top" id="medserver-logo">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item search-container">
                <input type="text" placeholder="Buscar Producto" class="form-control">
                <button type="button"><i class="fas fa-search"></i></button>
              </li>
              <li class="nav-item sucursales">
                <div class="sucursal-enlace" onmouseover="mostrarSucursales()" onmouseout="ocultarSucursales()">
                  <i class="fas fa-map-marker-alt location-icon"></i>
                  <span>Sucursales</span>
                </div>
                <ul id="lista-sucursales" class="lista-sucursales ps-0" onmouseover="mantenerVisible()" onmouseout="ocultarSucursales()">
                  <li class="sucursal-item">
                    <a href="${sucursalesPath}" class="sucursal-link">
                      <i class="fas fa-map-marker-alt"></i>
                      <div class="info-sucursal">
                        <div class="nombre-sucursal-hover">Viña</div>
                        <div class="direccion-hover">Álvarez 2336</div>
                      </div>
                    </a>
                  </li>
                  <li class="sucursal-item">
                    <a href="${sucursalesPath}" class="sucursal-link">
                      <i class="fas fa-map-marker-alt"></i>
                      <div class="info-sucursal">
                        <div class="nombre-sucursal-hover">+ 18 Sucursales mas</div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item" style="position: relative;">
              <a class="nav-link cart-toggle" href="javascript:void(0);" role="button">
                <i class="fas fa-shopping-cart cart-icon"></i>
              </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav class="navbar navbar-expand-lg bg-primary">
        <div class="container-fluid">
          <ul class="catalogo-nav">
            <li class="catalogo-item">
              Equipamiento Médico
              <div class="submenu">
                <a href="${baseUrl.endsWith('src') ? 'pages/equipamiento.html?categoria=diagnostico' : '../pages/equipamiento.html?categoria=diagnostico'}" class="submenu-item">
                  <i class="fas fa-stethoscope"></i> Diagnóstico
                </a>
                <a href="${baseUrl.endsWith('src') ? 'pages/equipamiento.html?categoria=emergencias' : '../pages/equipamiento.html?categoria=emergencias'}" class="submenu-item">
                  <i class="fas fa-ambulance"></i> Emergencias
                </a>
              </div>
            </li>
            <li class="catalogo-item ${activeSection === 'insumos' ? 'active' : ''}">
              Insumos Médicos
              <div class="submenu">
                <a href="${baseUrl.endsWith('src') ? 'pages/insumos.html?categoria=Insumos Descartables' : '../pages/insumos.html?categoria=Insumos Descartables'}" class="submenu-item"">
                  <i class="fas fa-hand-sparkles"></i> Insumos Descartables
                </a>
                <a href="${baseUrl.endsWith('src') ? 'pages/insumos.html?categoria=Líquidos y Soluciones' : '../pages/insumos.html?categoria=Líquidos y Soluciones'}" class="submenu-item"">
                  <i class="fas fa-tint"></i> Líquidos y Soluciones
                </a>
              </div>
            </li>
            <li class="catalogo-item ${activeSection === 'especializados' ? 'active' : ''}">
              Productos Especializados
              <div class="submenu">
                <a href="${baseUrl.endsWith('src') ? 'pages/especializados.html?categoria=Laboratorio Clínico' : '../pages/especializados.html?categoria=Laboratorio Clínico'}" class="submenu-item">
                  <i class="fas fa-flask"></i> Laboratorio Clínico
                </a>
                <a href="${baseUrl.endsWith('src') ? 'pages/especializados.html?categoria=Odontología' : '../pages/especializados.html?categoria=Odontología'}" class="submenu-item">
                  <i class="fas fa-tooth"></i> Odontología
                </a>
                <a href="${baseUrl.endsWith('src') ? 'pages/especializados.html?categoria=Cuidado del Hogar' : '../pages/especializados.html?categoria=Cuidado del Hogar'}" class="submenu-item">
                  <i class="fas fa-home"></i> Cuidado del Hogar
                </a>
              </div>
            </li>
            <li class="catalogo-item ${activeSection === 'repuestos' ? 'active' : ''}">
              Repuestos y Accesorios
              <div class="submenu">
                <a href="${baseUrl.endsWith('src') ? 'pages/repuesto.html?categoria=Repuestos para Equipos Médicos' : '../pages/repuesto.html?categoria=Repuestos para Equipos Médicos'}" class="submenu-item"">
                  <i class="fas fa-tools"></i> Repuestos para Equipos
                </a>
                <a href="${baseUrl.endsWith('src') ? 'pages/repuesto.html?categoria=Accesorios para Equipamiento' : '../pages/repuesto.html?categoria=Accesorios para Equipamiento'}" class="submenu-item"">
                  <i class="fas fa-cogs"></i> Accesorios para Equipamiento
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    `;
  };

  container.innerHTML = crearHeaderHTML('image/logo.png');

  obtenerRutaLogo().then(rutaCorrecta => {
    const logoImg = document.getElementById('medserver-logo');
    if (logoImg && logoImg.src !== rutaCorrecta) {
      logoImg.src = rutaCorrecta;
    }
  });

  window.mostrarSucursales = function() {
    document.getElementById('lista-sucursales').style.display = 'block';
  };

  window.ocultarSucursales = function() {
    setTimeout(function() {
      if (!document.querySelector(".lista-sucursales:hover") &&
          !document.querySelector(".sucursal-enlace:hover")) {
        document.getElementById('lista-sucursales').style.display = 'none';
      }
    }, 200);
  };

  window.mantenerVisible = function() {
    document.getElementById('lista-sucursales').style.display = 'block';
  };

  const cartModal = document.createElement('div');
  cartModal.id = 'cart-modal';
  cartModal.className = 'cart-modal';
  cartModal.style.display = 'none';
  cartModal.innerHTML = `
    <div class="cart-modal-content">
      <div class="cart-modal-header">
        <h3>Carrito de Compras</h3>
        <span class="cart-modal-close">&times;</span>
      </div>
      <div class="cart-modal-body">
        <!-- El contenido del carrito se cargará dinámicamente aquí -->
      </div>
      <div class="cart-modal-footer">
        <div class="cart-modal-total">
          <span>Total:</span>
          <span id="cart-modal-total-price">$0</span>
        </div>
        <div class="cart-modal-buttons">
          <button class="continue-shopping-btn">Seguir comprando</button>
          <button class="view-cart-btn">Ver carrito completo</button>
        </div>
      </div>
    </div>
  `;

document.body.appendChild(cartModal);
  
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'cart-modal-overlay';
  document.body.appendChild(modalOverlay);

  setTimeout(function() {
    const cartToggle = document.querySelector('.cart-toggle');
    if (cartToggle) {
      cartToggle.removeEventListener('click', cartClickHandler); // Eliminar eventos anteriores
      cartToggle.addEventListener('click', cartClickHandler);
    }
    
    const closeBtn = document.querySelector('.cart-modal-close');
    if (closeBtn) {
      closeBtn.removeEventListener('click', closeBtnClickHandler);
      closeBtn.addEventListener('click', closeBtnClickHandler);
    }
    
    const continueBtn = document.querySelector('.continue-shopping-btn');
    if (continueBtn) {
      continueBtn.removeEventListener('click', continueBtnClickHandler);
      continueBtn.addEventListener('click', continueBtnClickHandler);
    }
    
    const viewCartBtn = document.querySelector('.view-cart-btn');
    if (viewCartBtn) {
      viewCartBtn.removeEventListener('click', viewCartBtnClickHandler);
      viewCartBtn.addEventListener('click', viewCartBtnClickHandler);
    }
    
    const overlay = document.querySelector('.cart-modal-overlay');
    if (overlay) {
      overlay.removeEventListener('click', overlayClickHandler);
      overlay.addEventListener('click', overlayClickHandler);
    }
  }, 200);
  
  // Definir las funciones de manejo de eventos fuera para evitar duplicaciones
  function cartClickHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    if (window.ShoppingCart) {
      const cart = new ShoppingCart();
      cart.toggleCartModal();
    } else {
      toggleCartModalFallback();
    }
  }
  
  function closeBtnClickHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    if (window.ShoppingCart) {
      const cart = new ShoppingCart();
      cart.toggleCartModal();
    } else {
      toggleCartModalFallback();
    }
  }
  
  function continueBtnClickHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    if (window.ShoppingCart) {
      const cart = new ShoppingCart();
      cart.toggleCartModal();
    } else {
      toggleCartModalFallback();
    }
  }
  
  function viewCartBtnClickHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Clic en botón ver carrito');
    const baseUrl = window.location.pathname.split('/').slice(0, -1).join('/') || '/';
    const cartPath = baseUrl.endsWith('src') ? 'cart/carrito.html' : '../cart/carrito.html';
    window.location.href = cartPath;
  }
  
  function overlayClickHandler(event) {
    event.preventDefault();
    console.log('Clic en overlay');
    if (window.ShoppingCart) {
      const cart = new ShoppingCart();
      cart.toggleCartModal();
    } else {
      toggleCartModalFallback();
    }
  }

  window.toggleCartModalFallback = function() {
    const cartModal = document.getElementById('cart-modal');
    const overlay = document.querySelector('.cart-modal-overlay');
    
    if (!cartModal) return;
    
    if (cartModal.style.display !== 'block') {
      cartModal.style.display = 'block';
      if (overlay) overlay.style.display = 'block';
      cartModal.querySelector('.cart-modal-body').innerHTML = `
        <div class="cart-modal-empty">
          <i class="fas fa-shopping-cart"></i>
          <p>Cargando carrito...</p>
        </div>
      `;
    } else {
      cartModal.style.display = 'none';
      if (overlay) overlay.style.display = 'none';
    }
  };

  if (!document.querySelector('script[src*="bootstrap.min.js"]')) {
    const popperScript = document.createElement('script');
    popperScript.src = 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js';
    document.body.appendChild(popperScript);

    const bootstrapScript = document.createElement('script');
    bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js';
    document.body.appendChild(bootstrapScript);
  }
}

function verificarYCargarDependencias() {
  if (!document.querySelector('link[href*="bootstrap.min.css"]')) {
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    document.head.appendChild(bootstrapCSS);
  }

  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesomeCSS = document.createElement('link');
    fontAwesomeCSS.rel = 'stylesheet';
    fontAwesomeCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css';
    document.head.appendChild(fontAwesomeCSS);
  }
}

function inicializarHeader(targetElementId = 'header-container', activeSection = '') {
  verificarYCargarDependencias();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      cargarHeader(targetElementId, activeSection);
    });
  } else {
    cargarHeader(targetElementId, activeSection);
  }
}