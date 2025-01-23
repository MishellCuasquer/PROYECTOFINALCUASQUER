import React, { useState } from "react";

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

interface PropsAsignacion {
    profesores: Profesor[];
    asignaturas: Asignatura[];
    asignaciones: Asignacion[];
    setAsignaciones: React.Dispatch<React.SetStateAction<Asignacion[]>>;
};

const Asignacion: React.FC<PropsAsignacion> = ({
    asignaciones,
    profesores,
    asignaturas,
    setAsignaciones
}) => {
    const [idProfesor, setIdProfesor] = useState<number>(0);
    const [idAsignatura, setIdAsignatura] = useState<number>(0);
    const [codigoMateria, setCodigoMateria] = useState<string>('');
    const [asignacionEditando, setAsignacionEditando] = useState<number | null>(null);

    const manejarAgregarOEditar = () => {
        if (idProfesor && idAsignatura && codigoMateria) {
            if (asignacionEditando !== null) {
                setAsignaciones(
                    asignaciones.map((asignacion) =>
                        asignacion.id === asignacionEditando ? { ...asignacion, idProfesor, idAsignatura, codigoMateria } : asignacion
                    )
                );
                setAsignacionEditando(null);
            } else {
                const nuevaAsignacion: Asignacion = {
                    id: asignaciones.length + 1,
                    idProfesor,
                    idAsignatura,
                    codigoMateria,
                };
                setAsignaciones([...asignaciones, nuevaAsignacion]);
            }
            setIdProfesor(0);
            setIdAsignatura(0);
            setCodigoMateria('');
        } else {
            alert('Todos los campos son requeridos');
        }
    };

    const eliminarAsignacion = (id: number) => {
        const asignacion = asignaciones.find((asignacion) => asignacion.id === id);
        if (asignacion) {
            alert('No se puede eliminar la asignación porque tiene datos asociados.');
            return;
        }
        const asignacionesFiltradas = asignaciones.filter((asignacion) => asignacion.id !== id);
        setAsignaciones(asignacionesFiltradas);
    };

    const actualizarAsignacion = (id: number) => {
        const asignacion = asignaciones.find((asignacion) => asignacion.id === id);
        if (asignacion) {
            setIdProfesor(asignacion.idProfesor);
            setIdAsignatura(asignacion.idAsignatura);
            setCodigoMateria(asignacion.codigoMateria);
            setAsignacionEditando(id);
        }
    };

    return (
        <div className="contenedor-asignacion">
            <div className="titulo">
                <h1>Asignación</h1>
            </div>
            <div className="formasig">
                <form>
                    <label htmlFor="profesor">Profesor</label>
                    <select
                        value={idProfesor}
                        onChange={(e) => setIdProfesor(Number(e.target.value))}
                    >
                        <option value={0}>Seleccionar Profesor</option>
                        {profesores.map((profesor) => (
                            <option key={profesor.id} value={profesor.id}>
                                {profesor.nombre} {profesor.apellido}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="asignatura">Asignatura</label>
                    <select
                        value={idAsignatura}
                        onChange={(e) => setIdAsignatura(Number(e.target.value))}
                    >
                        <option value={0}>Seleccionar Asignatura</option>
                        {asignaturas.map((asignatura) => (
                            <option key={asignatura.id} value={asignatura.id}>
                                {asignatura.nombre}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="codigoMateria">Código Materia</label>
                    <input
                        type="text"
                        value={codigoMateria}
                        onChange={(e) => setCodigoMateria(e.target.value)}
                    />
                    <button type="button" onClick={manejarAgregarOEditar}>
                        {asignacionEditando ? 'Editar' : 'Agregar'}
                    </button>
                </form>
                <h2>Lista de Asignaciones</h2>
                <table className="tabla-asignacion">
                    <thead>
                        <tr>
                            <th>Profesor</th>
                            <th>Asignatura</th>
                            <th>Código Materia</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {asignaciones.map((asignacion) => (
                            <tr key={asignacion.id}>
                                <td>{profesores.find((profesor) => profesor.id === asignacion.idProfesor)?.nombre}</td>
                                <td>{asignaturas.find((asignatura) => asignatura.id === asignacion.idAsignatura)?.nombre}</td>
                                <td>{asignacion.codigoMateria}</td>
                                <td>
                                    <button className="eliminar" onClick={() => eliminarAsignacion(asignacion.id)}>Eliminar</button>
                                    <button className="actualizar" type="button" onClick={() => actualizarAsignacion(asignacion.id)}>Actualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Asignacion;