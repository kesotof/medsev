const messages = [
    {
        title: "Preparando los productos...",
        description: "Estamos preparando su producto con cuidado para la entrega."
    },
    {
        title: "Verificando su información...",
        description: "Por favor espere mientras procesamos su pedido."
    },
    {
        title: "¡El carro fue vaciado y el pago fue procesado con éxito!",
        description: "Gracias por su compra en MedSev."
    }
];

const progressBar = document.getElementById('progress-bar');
const loadingTitle = document.getElementById('loading-title');
const loadingDescription = document.getElementById('loading-description');
const loadingContent = document.getElementById('loading-content');
const successContent = document.getElementById('success-content');
const menuButton = document.getElementById('menu-button');

menuButton.addEventListener('click', function() {
    window.location.href = '../index.html';
});

let progress = 0;
let currentMessageIndex = 0;

function updateProgress() {
    if (progress >= 100) {
        loadingContent.style.display = 'none';
        successContent.style.display = 'flex';
        
        const successTitle = successContent.querySelector('h2');
        if (successTitle) {
            successTitle.textContent = "¡El carro fue vaciado y el pago fue procesado con éxito!";
        }
        
        descontarProductos();
        return;
    }
    
    progress += 1;
    progressBar.style.width = progress + '%';

    if (progress === 33) {
        currentMessageIndex = 1;
        loadingTitle.textContent = messages[currentMessageIndex].title;
        loadingDescription.textContent = messages[currentMessageIndex].description;
    } else if (progress === 66) {
        currentMessageIndex = 2;
        loadingTitle.textContent = messages[currentMessageIndex].title;
        loadingDescription.textContent = messages[currentMessageIndex].description;
    }
    
    setTimeout(updateProgress, 50);
}

function descontarProductos() {
    const productosCompradosJSON = localStorage.getItem('productosComprados');
    
    if (!productosCompradosJSON) {
        console.log('No hay productos para descontar del inventario');
        return;
    }
    
    try {
        const productosComprados = JSON.parse(productosCompradosJSON);
        
        let inventarioActual = localStorage.getItem("inventario");
        
        if (!inventarioActual) {
            console.log('No se encontró el inventario en localStorage. Creando nuevo inventario...');
            const tempInventario = localStorage.getItem("equipamiento_actualizado");
            
            if (tempInventario) {
                inventarioActual = tempInventario;
            } else {
                const inventarioBase = productosComprados.map(p => ({
                    ...p,
                    cantidad: Math.max(3, p.cantidad || 3),
                    cantidadEnCarrito: undefined
                }));
                
                inventarioActual = JSON.stringify(inventarioBase);
                localStorage.setItem("inventario", inventarioActual);
            }
        }
        
        inventarioActual = JSON.parse(inventarioActual);
        
        let productosActualizados = 0;
        productosComprados.forEach(productoComprado => {
            let productoEnInventario = inventarioActual.find(p => p.id === productoComprado.id);
            
            if (!productoEnInventario) {
                productoEnInventario = inventarioActual.find(p => p.nombre === productoComprado.nombre);
            }
            
            if (productoEnInventario) {
                const cantidadAnterior = productoEnInventario.cantidad;

                productoEnInventario.cantidad -= productoComprado.cantidadEnCarrito;
                
                if (productoEnInventario.cantidad < 0) {
                    productoEnInventario.cantidad = 0;
                }
                
                
                productosActualizados++;
            } else {
                console.log(`⚠️ No se encontró el producto ${productoComprado.nombre} en el inventario`);
                const nuevoProducto = {
                    ...productoComprado,
                    cantidad: 0,
                    cantidadEnCarrito: undefined
                };
                inventarioActual.push(nuevoProducto);
                console.log(`✅ Producto añadido al inventario: ${nuevoProducto.nombre} con cantidad 0`);
                productosActualizados++;
            }
        });

        if (productosActualizados > 0) {
            localStorage.setItem("inventario", JSON.stringify(inventarioActual));
            setTimeout(() => {
            }, 1000);
        } else {
            console.log('❌ No se pudo actualizar ningún producto en el inventario');
        }
        
        localStorage.removeItem('productosComprados');
        
    } catch (error) {
        console.error('❌ Error al descontar productos:', error);
        console.error('Detalles del error:', error.stack);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
});