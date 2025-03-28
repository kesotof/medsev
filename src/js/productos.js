let inventario = [
    { id: 1, nombre: "Monitor de Signos Vitales M10", descripcion: "https://medicaltec.cl/product/monitor-de-signos-vitales-m10-8-pulgadas-m8/", precio: 409990, cantidad: 3, tipo: "Diagnóstico",categoria:"Equipamiento medico", marca: "MEDITECH", imagen: "https://medicaltec.cl/wp-content/uploads/2022/11/meditech-2.-1.webp" },
    { id: 2, nombre: "Fonendoscopio Littmann Classic III Frambuesa Arcoiris 5806", descripcion: "https://www.falabella.com/falabella-cl/product/113888616/Fonendoscopio-Littmann-Classic-III-Frambuesa-Arcoiris-5806/113888617", precio: 113890, cantidad: 15, tipo: "Diagnóstico",categoria:"Equipamiento medico", marca: "LITTMANN", imagen: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/113888617_01/w=800,h=800,fit=pad" },
    { id: 3, nombre: "Esfigmomanometro Aneroide Adc 760 Naranjo", descripcion: "https://ivmedical.cl/collections/esfigmomanometro/products/esfigmomanometro-aneroide-adc-760-naranjo-1", precio: 22990, cantidad: 0, tipo: "Diagnóstico",categoria:"Equipamiento medico", marca: "ADC®", imagen: "https://ivmedical.cl/cdn/shop/products/5f1655bb-e17a-42d1-93a2-89404df913cb-naranjo2_2000x.jpg?v=1653362194" },
    { id: 4, nombre: "Oximetro de Pulso Creative PC-60B1", descripcion: "https://ivmedical.cl/collections/oximetros/products/oximetro-de-pulso-creative-pc-60b1-estuche", precio: 12990, cantidad: 25, tipo: "Diagnóstico",categoria:"Equipamiento medico", marca: "Creative®", imagen: "https://ivmedical.cl/cdn/shop/products/60b1-06-506b0c71-672f-4bc3-a75f-2c9413272204_2000x.jpg?v=1653363246" },
    { id: 5, nombre: "Glucómetro Accu-Chek® Instant", descripcion: "https://ivmedical.cl/collections/glucometros/products/glucometro-accuchek-instant", precio: 26990, cantidad: 12, tipo: "Diagnóstico",categoria:"Equipamiento medico", marca: "Accu-chek®", imagen: "https://ivmedical.cl/cdn/shop/files/INSTANT_METER_2000x.png?v=1720188947" },
    { id: 6, nombre: "Desfibrilador Externo Automatico DEA", descripcion: "https://biomedicimport.cl/producto/desfibrilador-externo-automatico-dea-distribucion-y-venta-de-equipos-medicos-biomedic-import/", precio: 1087000, cantidad: 1, tipo: "Emergencias",categoria:"Equipamiento medico", marca: "AED", imagen: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS-hqfaOZF0pR7IdlEkyWrgl3a7bcvlkTSJnARfY-RLqjXOV3dJHnPvAlGbP4ZVaai3WCYKhbjvcviuRGeGm6b21m0djBTcMuDx7ADmc6SN403GanC0RDgQpw" },
    { id: 7, nombre: "Botiquín Maleta Primeros Auxilios Mediano Ultra Resistente", descripcion: "https://articulo.mercadolibre.cl/MLC-2151443268-botiquin-maleta-primeros-auxilios-mediano-ultra-resistente-_JM?variation=181642207697#reco_item_pos=2&reco_backend=recomm-platform_v2p-model&reco_backend_type=low_level&reco_client=vpp-v2p-pom&reco_id=d9ee9e6f-73f0-4bf6-b4cb-917c64b73b03&reco_model=rk_ent_v3_retsys_org", precio: 14400, cantidad: 7, tipo: "Emergencias",categoria:"Equipamiento medico", marca: "Kit de primeros auxilios", imagen: "https://http2.mlstatic.com/D_NQ_NP_765430-MLC80547632189_112024-O-botiquin-maleta-primeros-auxilios-mediano-ultra-resistente.webp" },
    { id: 8, nombre: "Nebulizador Portatil Nevulizador Asma Manual Vaporizado Asma", descripcion: "https://articulo.mercadolibre.cl/MLC-1429039665-nebulizador-portatil-nevulizador-asma-manual-vaporizado-asma-_JM?matt_tool=16931662", precio: 7990, cantidad: 13, tipo: "Emergencias",categoria:"Equipamiento medico", marca: "GACCOA", imagen: "https://http2.mlstatic.com/D_NQ_NP_887964-MLC72093986151_102023-O-nebulizador-portatil-nevulizador-asma-manual-vaporizado-asma.webp" },
    { id: 9, nombre: "Guantes de Nitrilo Health Touch", descripcion: "https://dentalmacayachile.cl/producto/guantes-de-nitrilo-health-touch-caja-100-un/?attribute_tallas=XS&gad_source=1", precio: 3800, cantidad: 6, tipo: "Insumos Descartables",categoria:"Insumos Médicos", marca: "Health Touch", imagen: "https://dentalmacayachile.cl/wp-content/uploads/2024/04/guantes-nitrilo-health-touch.jpg" },
    { id: 10, nombre: "Respirador N95 3M 3 unidades para lijado y fibra de vidrio", descripcion: "https://sodimac.falabella.com/sodimac-cl/product/110273839/Respirador-N95-3M-3-unidades-para-lijado-y-fibra-de-vidrio/110273845", precio: 4390, cantidad: 8, tipo: "Insumos Descartables",categoria:"Insumos Médicos", marca: "3M", imagen: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/sodimacCL/2113457_01/w=1500,h=1500,fit=pad" },
    { id: 11, nombre: "Cofias Plisadas Desechables", descripcion: "https://www.lider.cl/ip/salud-y-bienestar/cofias-plisadas-desechables-gorro-clip-blanca-100-unidades/00590008000025?channable=050ee66964003030353930303038303030303235dd", precio: 3990, cantidad: 8, tipo: "Insumos Descartables",categoria:"Insumos Médicos", marca: "Clancarrier", imagen: "https://i5.walmartimages.cl/asr/e8f5e3b7-c14f-4c05-9ded-6c4d6144605c.8e3d8206036fd0ede57bbb8f38bca6eb.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" },
    { id: 12, nombre: "Suero Fisiologico 0.9% 250 ml Fresenius Kabi", descripcion: "https://techdent.cl/producto/suero-fisiologico-0-9-250ml/", precio: 2500, cantidad: 10, tipo: "Líquidos y Soluciones",categoria:"Insumos Médicos", marca: "Kabi", imagen: "https://techdent.cl/wp-content/uploads/2021/06/Suero-braun-250ml.jpg" },
    { id: 13, nombre: "DEFORT ALCOHOL ISOPROPILICO 1 LT", descripcion: "https://ditago.cl/products/df-alcohol-isopropilico-1l?variant=42510047117525&country=CL&currency=CLP", precio: 5950, cantidad: 6, tipo: "Líquidos y Soluciones",categoria:"Insumos Médicos", marca: "Ditago", imagen: "https://ditago.cl/cdn/shop/products/defort-alcohol-isopropilico-1-lt-ditago_652x700.jpg?v=1721333119" },
    { id: 14, nombre: "Agua desmineralizada 5 litros bidón", descripcion: "https://www.sodimac.cl/sodimac-cl/articulo/110127704/Agua-desmineralizada-5-litros-bidon/110127706", precio: 1990, cantidad: 14, tipo: "Líquidos y Soluciones",categoria:"Insumos Médicos", marca: "AUTOSTYLE", imagen: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/sodimacCL/896675_01/w=1500,h=1500,fit=pad" },
    { id: 15, nombre: "Germekil Desinfectante Amonios Cuaternarios- (5L)", descripcion: "https://axam.cl/products/germekil-desinfectante-amonios-cuaternarios-5lt?variant=43826320638203&country=CL&currency=CLP", precio: 33000, cantidad: 5, tipo: "Líquidos y Soluciones",categoria:"Insumos Médicos", marca: "Diversey", imagen: "https://axam.cl/cdn/shop/products/R02405Germekilx5L_CLEANQ_o_400x.jpg?v=1741708962" },
    { id: 16, nombre: "Sensor Electrocardiografía y Electromiografía", descripcion: "https://www.pcfactory.cl/producto/30352-olimex-sensor-electrocardiografia-y-electromiografia", precio: 11990, cantidad: 11, tipo: "Repuestos para Equipos Médicos",categoria:"Repuestos y Accesorios", marca: "Olimex", imagen: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSNtT6Sk8HPL_Fa-nhMZSHvlpvGif-4MG5_hSh06vq4F2vnds57jDhdHuxKV0JkKFkK54s3JXKVYTXswmXWd8LwN0jzZPRYJYO8MOGmFWBmzTXPQbghAdanVg" },
    { id: 17, nombre: "Tubos De Aspiración Con Conectores", descripcion: "https://safecare.cl/producto/tubos-de-aspiracion-con-conectores/", precio: 6990, cantidad: 9, tipo: "Repuestos para Equipos Médicos",categoria:"Repuestos y Accesorios", marca: "Safe Care", imagen: "https://safecare.cl/wp-content/uploads/2024/05/35.jpg" },
    { id: 18, nombre: "Barra Pedestal Porta Suero Portátil Con Ruedas", descripcion: "https://drcare.cl/products/barra-pedestal-porta-suero?variant=45318111396149&country=CL&currency=CLP", precio: 29990, cantidad: 2, tipo: "Accesorios para Equipamiento",categoria:"Repuestos y Accesorios", marca: "GLOMED", imagen: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR2Ij6kAWTqQFC1t0HI0oCqxQheTJJG55fxrO4Zg25kMukErebsr1y7NJQUuXinbScvX5UAI4Ljd8DwfnVdhcqj-KH4zD_KZCQ-J0yhJskMa5Cp_iUs2YUFj_c" },
    { id: 19, nombre: "Barandas Aluminio Plegable Catre Clínico", descripcion: "https://articulo.mercadolibre.cl/MLC-1863672832-barandas-aluminio-plegable-catre-clinicocasadelasalud-_JM?matt_tool=16931662", precio: 99900, cantidad: 1, tipo: "Accesorios para Equipamiento",categoria:"Repuestos y Accesorios", marca: "Vitality", imagen: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRr_h6OHiI2s3rnnww5q4MyvTN-DeTlTxgFJv0Uqq5-78lOgtSNidYHhwr2SShRkZYw2ecyftMUzdCOS1HexcUJMPx6R1FO3AmLcB3ucUmovKtmcdvtWbLMTSM" },
    { id: 20, nombre: "Balanza Digitales De Precisión Lcd De Miligramos 50g0001g", descripcion: "https://www.sodimac.cl/sodimac-cl/articulo/119425334/Balanza-Digitales-De-Precision-Lcd-De-Miligramos-50g0001g/119425335", precio: 25390, cantidad: 4, tipo: "Laboratorio Clínico",categoria:"Productos Especializados", marca: "KUANGYE", imagen: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/119425335_01/w=800,h=800,fit=pad" },
    { id: 21, nombre: "Medidor Accutrend Plus", descripcion: "https://ivmedical.cl/products/medidor-accutrend-plus?variant=40129465254025", precio: 169990, cantidad: 4, tipo: "Laboratorio Clínico",categoria:"Productos Especializados", marca: "Accu-chek®", imagen: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSguZTcfTNFpRNISFfWT2FjJU_cgdW6hogI2mDpdCq3vqEh-SsMqlD5ab7YU553rqUwxbiY5jTYBnTor57tJKqsrr0ou_MhTF5Pf_29_7xepQOg5k7RFTGocA" },
    { id: 22, nombre: "Kit Micromotor Completo + 2 Turbinas Led Calidad Maletín", descripcion: "https://articulo.mercadolibre.cl/MLC-1463463597-kit-micromotor-completo-2-turbinas-led-calidad-maletin-_JM?matt_tool=16931662", precio: 239990, cantidad: 5, tipo: "Odontología",categoria:"Productos Especializados", marca: "PAC", imagen: "https://http2.mlstatic.com/D_NQ_NP_644542-MLC82484584337_022025-O-kit-micromotor-completo-2-turbinas-led-calidad-maletin.webp" },
    { id: 23, nombre: "Equipo rayos X RAY68(M)", descripcion: "https://www.dental-laval.cl/products/equipo-rayos-x-ray68m?variant=29631383863384&country=CL&currency=CLP", precio: 1952433, cantidad: 2, tipo: "Odontología",categoria:"Productos Especializados", marca: "Runyes", imagen: "https://www.dental-laval.cl/cdn/shop/products/X-ray_RAY68_M_3_480x480.jpg?v=1615909360" },
    { id: 24, nombre: "Caja De Instrumental", descripcion: "https://dentalamerica.cl/caja-de-instrumental-8", precio: 12000, cantidad: 25, tipo: "Odontología",categoria:"Productos Especializados", marca: "Dixnox", imagen: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSvTSW-CNC1DH2MWHAXUB5thBfKK6QRjmUzGVef00oQ_1Zgx3R3uE2KQOElJKp7U7wgVAPlVZUejIM2rUvwefWb-8BdaGk0qUJ889_vglzWyP0yQNSKh5-DBf4" },
    { id: 25, nombre: "Toma Presión De Muñeca Omron Hem 6161E", descripcion: "https://ivmedical.cl/products/toma-presion-de-muneca-omron-hem-6161e?variant=42725676646537", precio: 34990, cantidad: 5, tipo: "Cuidado del Hogar",categoria:"Productos Especializados", marca: "Omron®", imagen: "https://ivmedical.cl/cdn/shop/files/HEM-6161E_2000x.jpg?v=1719953851" },
    { id: 26, nombre: "Termómetro Infrarrojo Digital Omron Mc720", descripcion: "https://articulo.mercadolibre.cl/MLC-552691144-termometro-infrarrojo-digital-omron-mc720-3-modos-medicion-_JM?matt_tool=16931662", precio: 43580, cantidad: 21, tipo: "Cuidado del Hogar",categoria:"Productos Especializados", marca: "Omron®", imagen: "https://http2.mlstatic.com/D_NQ_NP_801122-MLC43559399262_092020-O-termometro-infrarrojo-digital-omron-mc720-3-modos-medicion.webp" },
];

  function guardarInventario() {
    localStorage.setItem("inventario", JSON.stringify(inventario));
  }
  function obtenerInventario() {
    return inventario;
  }
  
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

  const inventarioGuardado = JSON.parse(localStorage.getItem("inventario"));
  if (inventarioGuardado) {
    inventario = inventarioGuardado;
  }

  guardarInventario();

function sincronizarInventarioActualizado() {
    const inventarioActualizado = localStorage.getItem("equipamiento_actualizado");
    if (inventarioActualizado) {
        try {
            const productosActualizados = JSON.parse(inventarioActualizado);
            localStorage.setItem("inventario", inventarioActualizado);
            localStorage.removeItem("equipamiento_actualizado");
        } catch (e) {
            console.error("Error al sincronizar inventario actualizado:", e);
        }
    }
}