import React, { useState, useEffect, useRef } from "react";
import './Votantes.scss';

const API = process.env.REACT_APP_API;

export const Votantes = () => {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [foto, setFoto] = useState("");
  const [clave, setClave] = useState("");

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");

  const nameInput = useRef(null);

  let [votantes, setVotantes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}/votantesdata`, {
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
            clave,
        }),
      });
      await res.json();
    } else {
      const res = await fetch(`${API}/votantesdata/${id}`, {
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
            clave,
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
    setClave("");
    nameInput.current.focus();
  };

  const getUsers = async () => {
    const res = await fetch(`${API}/votantesdata`);
    const data = await res.json();
    setVotantes(data);
  };

  const deleteUser = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      const res = await fetch(`${API}/votantesdata/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getUsers();
    }
  };

  const editUser = async (id) => {
    const res = await fetch(`${API}/votantesdata/${id}`);
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
    setClave(data.clave);
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
                type="password"
                onChange={(e) => setClave(e.target.value)}
                value={clave}
                className="form-control"
                placeholder="Clave"
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
                <th>Foto</th>
                <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {votantes.map((votante) => (
                <tr key={votante.id}>
                    <td>{votante.cedula}</td>
                    <td>{votante.nombre}</td>
                    <td>{votante.apellido}</td>
                    <td>{votante.email}</td>
                    <td>{votante.telefono}</td>
                    <td><img className="panel__image" src={votante.foto} alt="" /></td>
                    <td>
                    <button
                        className="btn btn-secondary btn-sm btn-block"
                        onClick={(e) => editUser(votante.id)}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-danger btn-sm btn-block"
                        onClick={(e) => deleteUser(votante.id)}
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