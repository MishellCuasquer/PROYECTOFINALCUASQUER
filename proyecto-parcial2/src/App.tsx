import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './componentes/menu';
import Inicio from './componentes/inicio';
import Profesor from './componentes/Profesor';
import Asignaturas from './componentes/Asignatura';  
import Asignaciones from './componentes/Asignacion';
import './componentes/inicio.css';
import './componentes/menu.css';
import './componentes/Asignacion.css';
import './componentes/Asignatura.css';
import './componentes/Profesor.css';
import './App.css';


// Interfaces actualizadas
interface Profesor {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  cedula: string;
  telefono: string;
  correo: string;
  horario: string;
};

interface Asignatura {
  id: number;
  nombre: string;
  codigo: string;
  horas: number;
};

interface Asignacion {
  id: number;
  idProfesor: number;
  idAsignatura: number;
  codigoMateria: string;
};

const App: React.FC = () => {
  const [profesores, setProfesores] = useState<Profesor[]>([
    { id: 1, nombre: 'Pedro', apellido: 'García', especialidad: 'Lenguaje', cedula: '789012', telefono: '0987654321', correo: 'pgarcia@hotmail.com', horario: 'Lunes a Viernes de 9:00 a 13:00' },
    { id: 2, nombre: 'Ana', apellido: 'Martínez', especialidad: 'Educación Física', cedula: '345678', telefono: '0987654321', correo: 'amartinez@hotmail.com', horario: 'Lunes a Viernes de 8:30 a 12:30' },
     
  ]);

  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([
    { id: 1, nombre: 'Cálculo', codigo: 'MATH101', horas: 40 },
    { id: 2, nombre: 'Matemáticas', codigo: 'MATH102', horas: 35 },

  ]);

  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([
    { id: 1, idProfesor: 1, idAsignatura: 1, codigoMateria: 'MATH101' },
    { id: 2, idProfesor: 2, idAsignatura: 2, codigoMateria: 'MATH102' },

  ]);

  // Leer datos del localStorage al cargar la aplicación
  useEffect(() => {
    const storageProfesores = localStorage.getItem('profesores');
    const storageAsignaturas = localStorage.getItem('asignaturas');
    const storageAsignaciones = localStorage.getItem('asignaciones');

    if (storageProfesores) {
      setProfesores(JSON.parse(storageProfesores));
    }
    if (storageAsignaturas) {
      setAsignaturas(JSON.parse(storageAsignaturas));
    }
    if (storageAsignaciones) {
      setAsignaciones(JSON.parse(storageAsignaciones));
    }
  }, []);

  // Guardar en localStorage cada vez que los estados cambian
  useEffect(() => {
    localStorage.setItem('profesores', JSON.stringify(profesores));
  }, [profesores]);

  useEffect(() => {
    localStorage.setItem('asignaturas', JSON.stringify(asignaturas));
  }, [asignaturas]);

  useEffect(() => {
    localStorage.setItem('asignaciones', JSON.stringify(asignaciones));
  }, [asignaciones]);

  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Profesor" element={<Profesor profesores={profesores} setProfesores={setProfesores} />} />
        <Route path="/Asignatura" element={<Asignaturas asignaturas={asignaturas} setAsignaturas={setAsignaturas} />} />
        <Route path="/Asignacion" element={<Asignaciones profesores={profesores} asignaturas={asignaturas} asignaciones={asignaciones} setAsignaciones={setAsignaciones} />} />
      </Routes>
    
    </Router>
  );
};

export default App;