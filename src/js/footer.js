class Footer {
    constructor() {
        this.footerHTML = `
            <footer class="footer-container">
                <!-- Sección Newsletter -->
                <div class="newsletter-section">
                    <div class="newsletter-content">
                        <div class="newsletter-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4e99e9" width="36" height="36">
                                <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z"/>
                            </svg>
                        </div>
                        <div class="newsletter-text">
                            <h3>Regístrate</h3>
                            <p>¡Regístrate y recibe las mejores ofertas en tu correo!</p>
                        </div>
                        <div class="newsletter-form">
                            <input type="email" placeholder="Tu correo electrónico" class="email-input">
                            <button class="subscribe-button">¡Regístrate</button>
                        </div>
                    </div>
                </div>

                <!-- Contenido principal del footer -->
                <div class="footer-main">
                    <div class="footer-logo">
                        <img src="../image/logo.png" alt="Logo">
                    </div>

                    <div class="footer-column">
                        <h4>SOBRE NOSOTROS</h4>
                        <ul>
                            <li><a href="#">Nosotros</a></li>
                            <li><a href="#">Contacto</a></li>
                            <li><a href="#">Preguntas Frecuentes</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h4>SERVICIO AL CLIENTE</h4>
                        <ul>
                            <li><a href="#">Preguntas Frecuentes</a></li>
                            <li><a href="#">Métodos de Envío</a></li>
                            <li><a href="#">Términos de Servicio</a></li>
                            <li><a href="#">Repuestos</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h4>MEDIOS DE PAGO</h4>
                        <div class="payment-methods">
                            <img src="https://woocommerce.com/wp-content/uploads/2021/05/tw-mercado-pago-v2@2x.png" alt="MercadoPago">
                            <img src="https://static.vecteezy.com/system/resources/previews/020/336/392/non_2x/visa-logo-visa-icon-free-free-vector.jpg" alt="Visa">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/800px-Mastercard-logo.svg.png" alt="Mastercard">
                        </div>
                        <div class="secure-purchase">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4e99e9" width="24" height="24">
                                <path d="M12,1L3,5v6c0,5.5,3.8,10.7,9,12c5.2-1.3,9-6.5,9-12V5L12,1z M12,11.7h7c-0.5,4.2-3.5,7.9-7,9V11.7z M5,11.7h7v9C8.5,19.6,5.5,15.9,5,11.7z M12,3.3l6.9,3.1H5.1L12,3.3z"/>
                            </svg>
                            <span>COMPRA SEGURA</span>
                        </div>
                    </div>
                </div>
            </footer>
        `;

        this.footerCSS = `
            <style>
                /* Estilos generales del footer */
                .footer-container {
                    font-family: Arial, sans-serif;
                    width: 100%;
                    background-color: #f5f5f5;
                }

                /* Estilos sección newsletter */
                .newsletter-section {
                    background-color: #f0f7f7;
                    padding: 15px 0;
                    border-bottom: 1px solid #e0e0e0;
                }

                .newsletter-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    padding: 0 20px;
                }

                .newsletter-icon {
                    margin-right: 15px;
                }

                .newsletter-text {
                    flex-grow: 1;
                }

                .newsletter-text h3 {
                    color: #666;
                    margin: 0;
                    font-weight: normal;
                }

                .newsletter-text p {
                    margin: 5px 0 0;
                    color: #888;
                    font-size: 14px;
                }

                .newsletter-form {
                    display: flex;
                    min-width: 320px;
                }

                .email-input {
                    padding: 10px;
                    border: 1px solid #ddd;
                    flex-grow: 1;
                    border-radius: 3px 0 0 3px;
                }

                .subscribe-button {
                    background-color: #4e99e9;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    cursor: pointer;
                    border-radius: 0 3px 3px 0;
                }

                /* Estilos contenido principal footer */
                .footer-main {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 40px 20px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                .footer-logo {
                    width: 200px;
                    margin-right: 40px;
                }

                .footer-logo img {
                    max-width: 100%;
                }

                .footer-column {
                    flex: 1; 
                    min-width: 200px;
                    margin-bottom: 30px;
                }

                .footer-column h4 {
                    color: #333;
                    margin-bottom: 20px;
                    font-size: 16px;
                }

                .footer-column ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .footer-column ul li {
                    margin-bottom: 10px;
                }

                .footer-column ul li a {
                    color: #666;
                    text-decoration: none;
                    font-size: 14px;
                }

                .footer-column ul li a:hover {
                    color: #4e99e9;
                }

                .payment-methods {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .payment-methods img {
                    height: 25px;
                }

                .secure-purchase {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                    color: #4e99e9;
                    font-weight: bold;
                    font-size: 14px;
                }

                .secure-purchase svg {
                    margin-right: 5px;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .newsletter-content {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .newsletter-icon {
                        margin-bottom: 10px;
                    }

                    .newsletter-form {
                        width: 100%;
                        margin-top: 15px;
                    }

                    .footer-logo {
                        width: 100%;
                        margin-bottom: 30px;
                    }

                    .footer-column {
                        width: 100%;
                    }
                }
            </style>
        `;
    }

    render(selector) {
        const container = document.querySelector(selector);
        if (container) {
            container.innerHTML = this.footerCSS + this.footerHTML;
        } else {
            console.error(`El selector "${selector}" no existe en el DOM.`);
        }
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Footer;
}