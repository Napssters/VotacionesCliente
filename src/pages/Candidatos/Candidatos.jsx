import React, { useState, useEffect, useRef } from "react";
import './Candidatos.scss';

const API = process.env.REACT_APP_API;

export const Candidatos = () => {
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [foto, setFoto] = useState("");
  const [partido, setPartido] = useState("");

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");

  const nameInput = useRef(null);

  let [candidatos, setCandidatos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}/candidatosdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cedula,
            nombre,
            apellido,
            email,
            telefono,
            foto,
            partido,
        }),
      });
      await res.json();
    } else {
      const res = await fetch(`${API}/candidatosdata/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cedula,
            nombre,
            apellido,
            email,
            telefono,
            foto,
            partido,
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
    await getUsers();

    setCedula("");
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
    setFoto("");
    setPartido("");
    nameInput.current.focus();
  };

  const getUsers = async () => {
    const res = await fetch(`${API}/candidatosdata`);
    const data = await res.json();
    setCandidatos(data);
  };

  const deleteUser = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      const res = await fetch(`${API}/candidatosdata/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getUsers();
    }
  };

  const editUser = async (id) => {
    const res = await fetch(`${API}/candidatosdata/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(id);

    // Reset
    setCedula(data.cedula);
    setNombre(data.nombre);
    setApellido(data.apellido);
    setEmail(data.email);
    setTelefono(data.telefono);
    setFoto(data.foto);
    setPartido(data.partido);
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
                onChange={(e) => setCedula(e.target.value)}
                value={cedula}
                className="form-control"
                placeholder="Cedula"
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
                onChange={(e) => setApellido(e.target.value)}
                value={apellido}
                className="form-control"
                placeholder="Apellido"
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
                onChange={(e) => setPartido(e.target.value)}
                value={partido}
                className="form-control"
                placeholder="Partido"
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
                <th>Cedula</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Partido</th>
                <th>Foto</th>
                <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {candidatos.map((candidato) => (
                <tr key={candidato.id}>
                    <td>{candidato.cedula}</td>
                    <td>{candidato.nombre}</td>
                    <td>{candidato.apellido}</td>
                    <td>{candidato.email}</td>
                    <td>{candidato.telefono}</td>
                    <td>{candidato.partido}</td>
                    <td><img className="panel__image" src={candidato.foto} alt="" /></td>
                    <td>
                    <button
                        className="btn btn-secondary btn-sm btn-block"
                        onClick={(e) => editUser(candidato.id)}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-danger btn-sm btn-block"
                        onClick={(e) => deleteUser(candidato.id)}
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