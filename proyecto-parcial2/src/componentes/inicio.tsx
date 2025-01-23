import React from "react";

const Inicio: React.FC = () => {
    return (
        <>
           
            {/* Contenedor principal */}
            <div className="container-presentacion">
                <div className="tarjeta-presentacion">
                    <div className="header">Caso 7 Sistema de gestión Educativa</div>
                    
                    <img
                        src="https://media.licdn.com/dms/image/D4D12AQFkbyi1fXOBvQ/article-cover_image-shrink_720_1280/0/1713029868056?e=2147483647&v=beta&t=XQFMVWULFQjUvQMBlbUFV-tMVBwCVQdmxEcqIpw8xs4"
                        alt="Sistema de Gestión Educativa"
                        className="featured-image"
                    />
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p className="footer-text">© 2025 Sistema de Gestión Educativa- Caso 7 PIC. Todos los derechos reservados.</p>
                </div>
            </footer>
        </>
    );
};

export default Inicio;
