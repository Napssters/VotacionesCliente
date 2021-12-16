import React, { useState, useRef, useEffect}from "react";
import { useHistory } from 'react-router-dom';
import './Home.scss';


const API = process.env.REACT_APP_API;

export const Home = () => {
    const isAdmin = false;
    const isUser = false;
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const nameInput = useRef(null);
    let [usuarios, setUsuarios] = useState("");
    let [votantes, setVotantes] = useState([]);

    const handleSubmit = (e) =>{
        usuarios.find(function(element){
            if((element.usuario == usuario) && (element.password == password)){
                isAdmin=true;
            }
        })
        votantes.find(function(element){
            if((element.nombre == usuario) && (element.clave == password)){
                isUser=true;
            }
        })
        if(isAdmin==true){
            history.push("/admin");
        }else{
            if(isUser==true){
                history.push("/votaciones");
            }else{
                window.alert("Datos de inicio de sesion incorrectos")
            }
        }
        setUsuario("");
        setPassword("");
    }

    const getUsuarios = async () =>{
        const res = await fetch(`${API}/usuariosdata`);
        const data = await res.json();
        setUsuarios(data);
    }

    const getVotantes = async () => {
        const res = await fetch(`${API}/votantesdata`);
        const data = await res.json();
        setVotantes(data);
    };

    useEffect(() => {
        getUsuarios();
        getVotantes();
      }, []);

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
                    <button className="poss btn btn-primary">
                         Entrar
                    </button>
                </form>
            </div>
        </div>   
    );
}


