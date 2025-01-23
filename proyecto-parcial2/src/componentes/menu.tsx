import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
    return (
        <nav className="menu-container">
            <Link to="/" >
                Inicio
            </Link>
            <Link to="/Profesor">
                Profesor
            </Link>
            <Link to="/Asignatura">
                Asignatura
            </Link>
            <Link to="/Asignacion">
                Asignación
            </Link>
        </nav>
        
    );
};

export default Menu;