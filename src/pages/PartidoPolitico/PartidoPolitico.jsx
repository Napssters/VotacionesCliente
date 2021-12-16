import React, { useState, useEffect, useRef } from "react";
import './PartidoPolitico.scss';

const API = process.env.REACT_APP_API;

export const PartidoPolitico = () => {
  const [nit, setNit] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [foto, setFoto] = useState("");
  const [administracion, setAdministracion] = useState("");

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");

  const nameInput = useRef(null);

  let [partidos, setPartidos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}/partidosdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nit,
            nombre,
            direccion,
            email,
            telefono,
            foto,
            administracion,
        }),
      });
      await res.json();
    } else {
      const res = await fetch(`${API}/partidosdata/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nit,
            nombre,
            direccion,
            email,
            telefono,
            foto,
            administracion,
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
    await getUsers();

    setNit("");
    setNombre("");
    setDireccion("");
    setEmail("");
    setTelefono("");
    setFoto("");
    setAdministracion("");
    nameInput.current.focus();
  };

  const getUsers = async () => {
    const res = await fetch(`${API}/partidosdata`);
    const data = await res.json();
    setPartidos(data);
  };

  const deleteUser = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      const res = await fetch(`${API}/partidosdata/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getUsers();
    }
  };

  const editUser = async (id) => {
    const res = await fetch(`${API}/partidosdata/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(id);

    // Reset
    setNit(data.nit);
    setNombre(data.nombre);
    setDireccion(data.direccion);
    setEmail(data.email);
    setTelefono(data.telefono);
    setFoto(data.foto);
    setAdministracion(data.administracion);
    nameInput.current.focus();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-3">
        <form onSubmit={handleSubmit} className="card card-body">
            <div className="form-group">
                <input
                type="text"
                onChange={(e) => setNit(e.target.value)}
                value={nit}
                className="form-control"
                placeholder="nit"
                ref={nameInput}
                autoFocus
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
                onChange={(e) => setDireccion(e.target.value)}
                value={direccion}
                className="form-control"
                placeholder="direccion"
                ref={nameInput}
                autoFocus
                />
            </div>
            <div className="form-group">
                <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
                placeholder="Email"
                />
            </div>
            <div className="form-group">
                <input
                type="text"
                onChange={(e) => setTelefono(e.target.value)}
                value={telefono}
                className="form-control"
                placeholder="Telefono"
                />
            </div>
            <div className="form-group">
                <input
                type="text"
                onChange={(e) => setFoto(e.target.value)}
                value={foto}
                className="form-control"
                placeholder="URL Foto"
                />
            </div>
            <div className="form-group">
                <input
                type="text"
                onChange={(e) => setAdministracion(e.target.value)}
                value={administracion}
                className="form-control"
                placeholder="Administracion"
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
                <th>nit</th>
                <th>Nombre</th>
                <th>direccion</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Administracion</th>
                <th>Foto</th>
                <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {partidos.map((partido) => (
                <tr key={partido.id}>
                    <td>{partido.nit}</td>
                    <td>{partido.nombre}</td>
                    <td>{partido.direccion}</td>
                    <td>{partido.email}</td>
                    <td>{partido.telefono}</td>
                    <td>{partido.administracion}</td>
                    <td><img className="panel__image" src={partido.foto} alt="" /></td>
                    <td>
                    <button
                        className="btn btn-secondary btn-sm btn-block"
                        onClick={(e) => editUser(partido.id)}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-danger btn-sm btn-block"
                        onClick={(e) => deleteUser(partido.id)}
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
  );
};