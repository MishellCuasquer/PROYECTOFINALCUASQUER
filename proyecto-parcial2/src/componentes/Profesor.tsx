import React, { useState } from 'react';

interface Asignacion {
    id: number;
    idProfesor: number;
    idAsignatura: number;
    fecha: string;
};

interface Profesor {
    id: number;
    nombre: string;
    apellido: string;
    especialidad: string;
    cedula: string;
    telefono: string;
    correo: string;
};

interface PropsProfesor {
    profesores: Profesor[];
    setProfesores: React.Dispatch<React.SetStateAction<Profesor[]>>;
    asignaciones: Asignacion[];
};

const RegistrarProfesor: React.FC<PropsProfesor> = ({
    profesores,
    setProfesores,
    
}) => {
    const [nombre, setNombre] = useState<string>('');
    const [apellido, setApellido] = useState<string>('');
    const [especialidad, setEspecialidad] = useState<string>('');
    const [cedula, setCedula] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [correo, setCorreo] = useState<string>('');
    const [profesorEditando, setProfesorEditando] = useState<number | null>(null);

    const manejarAgregarOEditar = () => {
        if (nombre.trim() && apellido.trim() && especialidad.trim() && cedula.trim() && telefono.trim() && correo.trim()) {
            if (profesorEditando !== null) {
                setProfesores(
                    profesores.map((profesor) =>
                        profesor.id === profesorEditando ? { ...profesor, nombre, apellido, especialidad, cedula, telefono, correo } : profesor
                    )
                );
                setProfesorEditando(null);
            } else {
                const nuevoProfesor: Profesor = {
                    id: profesores.length + 1,
                    nombre,
                    apellido,
                    especialidad,
                    cedula,
                    telefono,
                    correo
                };
                setProfesores([...profesores, nuevoProfesor]);
            }
            setNombre('');
            setApellido('');
            setEspecialidad('');
            setCedula('');
            setTelefono('');
            setCorreo('');
        } else {
            alert('Todos los campos son requeridos');
        }
    };

    const eliminarProfesor = (id: number) => {
        const confirmar = window.confirm('¿Seguro que desea eliminar?');
        setProfesores(profesores.filter((profesor) => profesor.id !== id));
    };

    const actualizarProfesor = (id: number) => {
        const profesor = profesores.find((profesor) => profesor.id === id);
        if (profesor) {
            setNombre(profesor.nombre);
            setApellido(profesor.apellido);
            setEspecialidad(profesor.especialidad);
            setCedula(profesor.cedula);
            setTelefono(profesor.telefono);
            setCorreo(profesor.correo);
            setProfesorEditando(profesor.id);
        }
    };

    return (
        <div className='contenedor-profesor'>
            <div className="titulo">
                <h1>Profesores</h1>
            </div>
            <div className="formProf">
                <form>
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre" />
                    <label>Apellido</label>
                    <input 
                        type="text" 
                        value={apellido} 
                        onChange={(e) => setApellido(e.target.value)}
                        placeholder="Apellido" />
                    <label>Especialidad</label>
                    <input 
                        type="text" 
                        value={especialidad} 
                        onChange={(e) => setEspecialidad(e.target.value)}
                        placeholder="Especialidad" />
                    <label>Cedula</label>
                    <input 
                        type="text" 
                        value={cedula} 
                        onChange={(e) => setCedula(e.target.value)}
                        placeholder="Cedula" />
                    <label>Telefono</label>
                    <input 
                        type="text" 
                        value={telefono} 
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="Telefono" />
                    <label>Correo</label>
                    <input 
                        type="text" 
                        value={correo} 
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="Correo" />
                    <button type="button" onClick={manejarAgregarOEditar}>
                        {profesorEditando !== null ? 'Editar' : 'Agregar'}
                    </button>
                </form>
                <h2>Lista de Profesores</h2>
                <table className='tabla-profesor'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Especialidad</th>
                            <th>Cedula</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profesores.map((profesor) => (
                            <tr key={profesor.id}>
                                <td>{profesor.nombre}</td>
                                <td>{profesor.apellido}</td>
                                <td>{profesor.especialidad}</td>
                                <td>{profesor.cedula}</td>
                                <td>{profesor.telefono}</td>
                                <td>{profesor.correo}</td>
                                <td>
                                    <button className='eliminar' onClick={() => eliminarProfesor(profesor.id)}>Eliminar</button>
                                    <button className='actualizar' onClick={() => actualizarProfesor(profesor.id)}>Actualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegistrarProfesor;
