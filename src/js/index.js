function mostrarSucursales() {
    document.getElementById('lista-sucursales').style.display = 'block';
  }
  
  function ocultarSucursales() {
    setTimeout(function() {
      if (!document.querySelector(".lista-sucursales:hover") && 
          !document.querySelector(".sucursal-enlace:hover")) {
        document.getElementById('lista-sucursales').style.display = 'none';
      }
    }, 200);
  }
  
  function mantenerVisible() {
    document.getElementById('lista-sucursales').style.display = 'block';
  }