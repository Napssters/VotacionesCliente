import React, { useState, useEffect, useRef } from 'react'

const API = process.env.REACT_APP_API;

export const Elecciones = () => {
    const [fecha, setFecha] = useState("");
    const [horainicio, setHoraInicio] = useState("");
    const [horafiin, setHoraFiin] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [editing, setEditing] = useState(false);
    const [id, setId] = useState("");

    const nameInput = useRef(null);

    let [elecciones, setElecciones] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editing) {
          const res = await fetch(`${API}/eleccionesdata`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fecha,
                horainicio,
                horafiin,
                nombre,
                descripcion,
            }),
          });
          await res.json();
        } else {
          const res = await fetch(`${API}/eleccionesdata/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fecha,
                horainicio,
                horafiin,
                nombre,
                descripcion,
            }),
          });
          const data = await res.json();
          setEditing(false);
          setId("");
        }
        await getElecciones();
    
        
        setFecha("");
        setHoraInicio("");
        setHoraFiin("");
        setNombre("");
        setDescripcion("");
        nameInput.current.focus();
      };

    const getElecciones = async () => {
        const res = await fetch(`${API}/eleccionesdata`);
        const data = await res.json();
        setElecciones(data);
      };

    const deleteElecciones = async (id) => {
        const userResponse = window.confirm("Are you sure you want to delete it?");
        if (userResponse) {
          const res = await fetch(`${API}/eleccionesdata/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          await getElecciones();
        }
    };

    const editElecciones = async (id) => {
        const res = await fetch(`${API}/eleccionesdata/${id}`);
        const data = await res.json();
    
        setEditing(true);
        setId(id);
    
        // Reset
        setFecha(data.fecha);
        setHoraInicio(data.horainicio);
        setHoraFiin(data.horafiin);
        setNombre(data.nombre);
        setDescripcion(data.descripcion);
        nameInput.current.focus();
    };
    
    useEffect(() => {
        getElecciones();
    }, []);

    return (
        <div className="row">
            <div className="col-md-3">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input
                        type="date"
                        onChange={(e) => setFecha(e.target.value)}
                        value={fecha}
                        className="form-control"
                        placeholder="Fecha"
                        ref={nameInput}
                        autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="time"
                        onChange={(e) => setHoraInicio(e.target.value)}
                        value={horainicio}
                        className="form-control"
                        placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="time"
                        onChange={(e) => setHoraFiin(e.target.value)}
                        value={horafiin}
                        className="form-control"
                        placeholder="Hora final"
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="text"
                        onChange={(e) => setNombre(e.target.value)}
                        value={nombre}
                        className="form-control"
                        placeholder="Nombre"
                        ref={nameInput}
                        autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="text"
                        onChange={(e) => setDescripcion(e.target.value)}
                        value={descripcion}
                        className="form-control"
                        placeholder="Descripcion"
                        />
                    </div>
                    <button className="btn btn-primary btn-block">
                        {editing ? "Update" : "Create"}
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-responsive table-striped">
                    <thead>
                        <tr>
                        <th>Fecha</th>
                        <th>Hora Inicio</th>
                        <th>Hora Fin</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elecciones.map((eleccion) => (
                        <tr key={eleccion.id}>
                            <td>{eleccion.fecha}</td>
                            <td>{eleccion.horainicio}</td>
                            <td>{eleccion.horafiin}</td>
                            <td>{eleccion.nombre}</td>
                            <td>{eleccion.descripcion}</td>
                            <td>
                            <button
                                className="btn btn-secondary btn-sm btn-block"
                                onClick={(e) => editElecciones(eleccion.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm btn-block"
                                onClick={(e) => deleteElecciones(eleccion.id)}
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}
