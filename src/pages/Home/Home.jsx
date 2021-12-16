import React, { useState, useRef}from "react";
import { useHistory } from 'react-router-dom';
import './Home.scss';


const API = process.env.REACT_APP_API;

export const Home = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const nameInput = useRef(null);

    const handleSubmit = (e) =>{
        e.preventDefault();
    }

    const loginAdmin = async () =>{
        const res = await fetch(`${API}/admindata`);
        const data = await res.json();
        nameInput.current.focus();
        await redirectAdmin(data);
    }

    const loginUser = async () =>{
        const res = await fetch(`${API}/votantesdata`);
        const data = await res.json();
        nameInput.current.focus();
        await redirectUser(data);
    }

    const redirectUser = async (data) => {
        data.filter(function(element){
            if((element.nombre == usuario) && (element.clave == password)){
                history.push('/eleccioncandidato') 
            }
        });
    }

    const redirectAdmin = async (data) => {
        data.filter(function(element){
            if((element.usuario == usuario) && (element.password == password)){
                history.push('/admin') 
            }
        });
    }
    
    return (
        <div className="vh-100 d-flex flex-column">
            <div className="container text-center poss">
                <h2>Sistema de Votaciones Electronico</h2>
            </div>
            <div className=" flex-1 container-fluid d-flex justify-content-end align-items-end">
                <form onSubmit={handleSubmit} className="container card card-body col-md-3 poss">
                    <h3 className="fuente text-center">Login</h3>
                    <div className="form-group">
                        <input 
                            type="text" 
                            onChange={(e) => setUsuario(e.target.value)}
                            value={usuario}
                            className="form-control"
                            placeholder="Usuario/Nombre"
                            ref={nameInput}
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="form-control"
                            placeholder="Clave"
                            ref={nameInput}
                            autoFocus
                        />
                    </div>
                    <div className="container-fluid">
                        <button 
                            onClick={(e) => loginAdmin()}
                            className="btn btn-primary"
                        >
                            Enter As Admin
                        </button>
                        <button 
                            onClick={(e) => loginUser()}
                            className="poss-button btn btn-primary"
                        >
                            Enter As User
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>   
    );
}


