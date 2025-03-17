let inventario = [
    { id: 1, nombre: "Monitor de Signos Vitales M10", descripcion: "https://medicaltec.cl/product/monitor-de-signos-vitales-m10-8-pulgadas-m8/", precio: 409990, cantidad: 3, tipo: "Diagnóstico",categoria:"Equipamiento medico", marca: "MEDITECH", imagen: "https://medicaltec.cl/wp-content/uploads/2022/11/meditech-2.-1.webp" },
    { id: 2, nombre: "Fonendoscopio Littmann Classic III Frambuesa Arcoiris 5806", descripcion: "https://www.falabella.com/falabella-cl/product/113888616/Fonendoscopio-Littmann-Classic-III-Frambuesa-Arcoiris-5806/113888617", precio: 113890, cantidad: 15, tipo: "Diagnóstico",categoria:"Equipamiento medico", marca: "LITTMANN", imagen: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/113888617_01/w=800,h=800,fit=pad" },
    { id: 3, nombre: "Esfigmomanometro Aneroide Adc 760 Naranjo", descripcion: "https://ivmedical.cl/collections/esfigmomanometro/products/esfigmomanometro-aneroide-adc-760-naranjo-1", precio: 22990, cantidad: 10, tipo: "Diagnóstico",categoria:"Equipamiento medico", marca: "ADC®", imagen: "https://ivmedical.cl/cdn/shop/products/5f1655bb-e17a-42d1-93a2-89404df913cb-naranjo2_2000x.jpg?v=1653362194" },
    { id: 4, nombre: "Oximetro de Pulso Creative PC-60B1", descripcion: "https://ivmedical.cl/collections/oximetros/products/oximetro-de-pulso-creative-pc-60b1-estuche", precio: 12990, cantidad: 25, tipo: "Diagnóstico",categoria:"Equipamiento medico", marca: "Creative®", imagen: "https://ivmedical.cl/cdn/shop/products/60b1-06-506b0c71-672f-4bc3-a75f-2c9413272204_2000x.jpg?v=1653363246" },
    { id: 5, nombre: "Glucómetro Accu-Chek® Instant", descripcion: "https://ivmedical.cl/collections/glucometros/products/glucometro-accuchek-instant", precio: 26990, cantidad: 12, tipo: "Diagnóstico",categoria:"Equipamiento medico", marca: "Accu-chek®", imagen: "https://ivmedical.cl/cdn/shop/files/INSTANT_METER_2000x.png?v=1720188947" },
    { id: 6, nombre: "Desfibrilador Externo Automatico DEA", descripcion: "https://biomedicimport.cl/producto/desfibrilador-externo-automatico-dea-distribucion-y-venta-de-equipos-medicos-biomedic-import/", precio: 1087000, cantidad: 1, tipo: "Emergencias",categoria:"Equipamiento medico", marca: "AED", imagen: "https://biomedicimport.cl/wp-content/uploads/2019/09/defi5-2-600x438.png" },
    { id: 7, nombre: "Botiquín Maleta Primeros Auxilios Mediano Ultra Resistente", descripcion: "https://articulo.mercadolibre.cl/MLC-2151443268-botiquin-maleta-primeros-auxilios-mediano-ultra-resistente-_JM?variation=181642207697#reco_item_pos=2&reco_backend=recomm-platform_v2p-model&reco_backend_type=low_level&reco_client=vpp-v2p-pom&reco_id=d9ee9e6f-73f0-4bf6-b4cb-917c64b73b03&reco_model=rk_ent_v3_retsys_org", precio: 14400, cantidad: 7, tipo: "Emergencias",categoria:"Equipamiento medico", marca: "Kit de primeros auxilios", imagen: "https://http2.mlstatic.com/D_NQ_NP_765430-MLC80547632189_112024-O-botiquin-maleta-primeros-auxilios-mediano-ultra-resistente.webp" },
    { id: 8, nombre: "Nebulizador Portatil Nevulizador Asma Manual Vaporizado Asma", descripcion: "https://articulo.mercadolibre.cl/MLC-1429039665-nebulizador-portatil-nevulizador-asma-manual-vaporizado-asma-_JM?matt_tool=16931662", precio: 7990, cantidad: 13, tipo: "Emergencias",categoria:"Equipamiento medico", marca: "GACCOA", imagen: "https://http2.mlstatic.com/D_NQ_NP_887964-MLC72093986151_102023-O-nebulizador-portatil-nevulizador-asma-manual-vaporizado-asma.webp" },
    { id: 9, nombre: "Guantes de Nitrilo Health Touch", descripcion: "https://dentalmacayachile.cl/producto/guantes-de-nitrilo-health-touch-caja-100-un/?attribute_tallas=XS&gad_source=1", precio: 3800, cantidad: 6, tipo: "Insumos Descartables",categoria:"Insumos Médicos", marca: "Health Touch", imagen: "https://dentalmacayachile.cl/wp-content/uploads/2024/04/guantes-nitrilo-health-touch.jpg" },
    { id: 10, nombre: "Respirador N95 3M 3 unidades para lijado y fibra de vidrio", descripcion: "https://sodimac.falabella.com/sodimac-cl/product/110273839/Respirador-N95-3M-3-unidades-para-lijado-y-fibra-de-vidrio/110273845", precio: 4390, cantidad: 8, tipo: "Insumos Descartables",categoria:"Insumos Médicos", marca: "3M", imagen: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/sodimacCL/2113457_01/w=1500,h=1500,fit=pad" },
    { id: 11, nombre: "Cofias Plisadas Desechables", descripcion: "https://www.lider.cl/ip/salud-y-bienestar/cofias-plisadas-desechables-gorro-clip-blanca-100-unidades/00590008000025?channable=050ee66964003030353930303038303030303235dd", precio: 3990, cantidad: 8, tipo: "Insumos Descartables",categoria:"Insumos Médicos", marca: "Clancarrier", imagen: "https://i5.walmartimages.cl/asr/e8f5e3b7-c14f-4c05-9ded-6c4d6144605c.8e3d8206036fd0ede57bbb8f38bca6eb.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" },
    { id: 12, nombre: "Suero Fisiologico 0.9% 250 ml Fresenius Kabi", descripcion: "https://techdent.cl/producto/suero-fisiologico-0-9-250ml/", precio: 2500, cantidad: 10, tipo: "Líquidos y Solucioness",categoria:"Insumos Médicos", marca: "Kabi", imagen: "https://techdent.cl/wp-content/uploads/2021/06/Suero-braun-250ml.jpg" },
    { id: 13, nombre: "DEFORT ALCOHOL ISOPROPILICO 1 LT", descripcion: "https://ditago.cl/products/df-alcohol-isopropilico-1l?variant=42510047117525&country=CL&currency=CLP", precio: 5950, cantidad: 6, tipo: "Líquidos y Soluciones",categoria:"Insumos Médicos", marca: "Ditago", imagen: "https://ditago.cl/cdn/shop/products/defort-alcohol-isopropilico-1-lt-ditago_652x700.jpg?v=1721333119" },
    { id: 14, nombre: "Agua desmineralizada 5 litros bidón", descripcion: "https://www.sodimac.cl/sodimac-cl/articulo/110127704/Agua-desmineralizada-5-litros-bidon/110127706", precio: 1990, cantidad: 14, tipo: "Líquidos y Soluciones",categoria:"Insumos Médicos", marca: "AUTOSTYLE", imagen: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/sodimacCL/896675_01/w=1500,h=1500,fit=pad" },
    { id: 15, nombre: "Germekil Desinfectante Amonios Cuaternarios- (5L)", descripcion: "https://axam.cl/products/germekil-desinfectante-amonios-cuaternarios-5lt?variant=43826320638203&country=CL&currency=CLP", precio: 33000, cantidad: 5, tipo: "Líquidos y Soluciones",categoria:"Insumos Médicos", marca: "Diversey", imagen: "https://axam.cl/cdn/shop/products/R02405Germekilx5L_CLEANQ_o_400x.jpg?v=1741708962" },
    { id: 16, nombre: "", descripcion: "", precio: , cantidad: , tipo: "Insumos Descartables",categoria:"Insumos Médicos", marca: "", imagen: "" },
    { id: 17, nombre: "", descripcion: "", precio: , cantidad: , tipo: "Insumos Descartables",categoria:"Insumos Médicos", marca: "", imagen: "" },
];

  function guardarInventario() {
    localStorage.setItem("inventario", JSON.stringify(inventario));
  }
  
  /**
   * Obtiene el inventario actual.
   * @returns {Array}
   */
  function obtenerInventario() {
    return inventario;
  }
  
  /**
   * Filtra el inventario por rangos de IDs.
   * @param {Array} rangos
   * @returns {Array}
   */
  function filtrarPorIds(rangos) {
    const idsFiltrados = [];
    rangos.forEach(([inicio, fin]) => {
      for (let i = inicio; i <= fin; i++) {
        idsFiltrados.push(i);
      }
    });
    return inventario.filter(producto => idsFiltrados.includes(producto.id));
  }

  function reiniciarInventario() {
    localStorage.removeItem("inventario");
    location.reload();
  }

  // Cargar inventario desde localStorage al iniciar (si existe)
  const inventarioGuardado = JSON.parse(localStorage.getItem("inventario"));
  if (inventarioGuardado) {
    inventario = inventarioGuardado;
  }