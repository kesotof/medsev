// Archivo: header.js

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
      return `
        <nav class="navbar navbar-expand-lg top-navbar">
          <div class="container-fluid">
            <a class="navbar-brand" href="pages/pruba.html">
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
                      <a href="pages/sucursales.html" class="sucursal-link">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="info-sucursal">
                          <div class="nombre-sucursal-hover">Viña</div>
                          <div class="direccion-hover">Álvarez 2336</div>
                        </div>
                      </a>
                    </li>
                    <li class="sucursal-item">
                      <a href="pages/sucursales.html" class="sucursal-link">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="info-sucursal">
                          <div class="nombre-sucursal-hover">+ 18 Sucursales mas</div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                  <a href="pages/diagnostico.html" class="submenu-item">
                    <i class="fas fa-stethoscope"></i> Diagnóstico
                  </a>
                  <a href="pages/emergencias.html" class="submenu-item">
                    <i class="fas fa-ambulance"></i> Emergencias
                  </a>
                </div>
              </li>
              <li class="catalogo-item ${activeSection === 'insumos' ? 'active' : ''}">
                Insumos Médicos
                <div class="submenu">
                  <a href="pages/descartables.html" class="submenu-item">
                    <i class="fas fa-hand-sparkles"></i> Insumos Descartables
                  </a>
                  <a href="pages/soluciones.html" class="submenu-item">
                    <i class="fas fa-tint"></i> Líquidos y Soluciones
                  </a>
                </div>
              </li>
              <li class="catalogo-item ${activeSection === 'especializados' ? 'active' : ''}">
                Productos Especializados
                <div class="submenu">
                  <a href="pages/laboratorio.html" class="submenu-item">
                    <i class="fas fa-flask"></i> Laboratorio Clínico
                  </a>
                  <a href="pages/odontologia.html" class="submenu-item">
                    <i class="fas fa-tooth"></i> Odontología
                  </a>
                </div>
              </li>
              <li class="catalogo-item ${activeSection === 'repuestos' ? 'active' : ''}">
                Repuestos y Accesorios
                <div class="submenu">
                  <a href="pages/repuestos.html" class="submenu-item">
                    <i class="fas fa-tools"></i> Repuestos para Equipos
                  </a>
                  <a href="pages/accesorios.html" class="submenu-item">
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