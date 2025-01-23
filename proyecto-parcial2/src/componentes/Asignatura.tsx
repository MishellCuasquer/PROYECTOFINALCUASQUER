import React, { useState } from "react";

interface Asignacion {
    id: number;
    idProfesor: number;
    idAsignatura: number;
    fecha: string;
}

interface Asignatura {
    id: number;
    nombre: string;
    codigo: string;
    horas: number;
}

interface PropsAsignatura {
    asignaturas: Asignatura[];
    setAsignaturas: React.Dispatch<React.SetStateAction<Asignatura[]>>;
    asignaciones: Asignacion[];
}


const RegistrarAsignatura: React.FC<PropsAsignatura> = ({
    asignaturas,
    setAsignaturas,
    
}) => {
    const [nombre, setNombre] = useState<string>('');
    const [codigo, setCodigo] = useState<string>('');
    const [horas, setHoras] = useState<number>(0);
    const [asignaturaEditando, setAsignaturaEditando] = useState<number | null>(null);

    const manejarAgregarOEditar = () => {
        if (nombre.trim() && codigo.trim() && horas > 0) {
            if (asignaturaEditando !== null) {
                setAsignaturas(
                    asignaturas.map((asignatura) =>
                        asignatura.id === asignaturaEditando ? { ...asignatura, nombre, codigo, horas } : asignatura
                    )
                );
                setAsignaturaEditando(null);
            } else {
                const nuevaAsignatura: Asignatura = {
                    id: asignaturas.length + 1,
                    nombre,
                    codigo,
                    horas
                };
                setAsignaturas([...asignaturas, nuevaAsignatura]);
            }
            setNombre('');
            setCodigo('');
            setHoras(0);
        } else {
            alert('Todos los campos son requeridos');
        }
    };

    const eliminarAsignatura = (id: number) => {
        const confirmar = window.confirm('¿Seguro que desea eliminar esta asignatura?');
        if (confirmar) {
            setAsignaturas(asignaturas.filter((asignatura) => asignatura.id !== id));
        }
    };

    const actualizarAsignatura = (id: number) => {
        const asignatura = asignaturas.find((asignatura) => asignatura.id === id);
        if (asignatura) {
            setNombre(asignatura.nombre);
            setCodigo(asignatura.codigo);
            setHoras(asignatura.horas);
            setAsignaturaEditando(id);
        }
    };

    return (
        <div className="contenedor-asignatura">
            <div className="titulo">
                <h1>Asignatura</h1>
            </div>
            <div className="fromAsig">
                <form>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} />
                    <label>Código:</label>
                    <input 
                        type="text" 
                        value={codigo} 
                        onChange={(e) => setCodigo(e.target.value)} />
                    <label>Horas que cumple:</label>
                    <input 
                        type="number" 
                        value={horas} 
                        onChange={(e) => setHoras(Number(e.target.value))} />
                    <button type="button" onClick={manejarAgregarOEditar}>
                        {asignaturaEditando !== null ? 'Editar' : 'Agregar'}
                    </button>
                </form>
                <h2>Lista de Asignaturas</h2>
                <table className="tabla-asignatura">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Horas que cumple</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {asignaturas.map((asignatura: Asignatura) => (
                            <tr key={asignatura.id}>
                                <td>{asignatura.nombre}</td>
                                <td>{asignatura.codigo}</td>
                                <td>{asignatura.horas}</td>
                                <td>
                                    <button className="eliminar" onClick={() => eliminarAsignatura(asignatura.id)}>Eliminar</button>
                                    <button className="actualizar" onClick={() => actualizarAsignatura(asignatura.id)}>Actualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegistrarAsignatura;