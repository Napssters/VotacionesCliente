import React/*, { useState, useEffect, useRef } */from "react";
import { useHistory } from 'react-router-dom';
import  './Admin.scss';


//const API = process.env.REACT_APP_API;

export const Admin = () => {
    const history = useHistory();
    return (
        <div className="vh-100 d-flex flex-column">
            <div className="container text-center poss">
                <h2>Consola Administrador</h2>
            </div>
            <div className="ontainer-fluid justify-content-center d-flex align-items-center">
                <button 
                    onClick={(e) => history.push('/registrarcandidatos')}
                    className="poss btn btn-primary" 
                >
                    Registrar Candidatos 
                </button>
                <button 
                    onClick={(e) => history.push('/registrarvotantes')}
                    className="poss btn btn-primary" 
                >
                    Registrar Votantes 
                </button>
                <button 
                    onClick={(e) => history.push('/registrarelecciones')}
                    className="poss btn btn-primary" 
                >
                    Crear Elecciones 
                </button>
            </div>
        </div>      
    );
}


export default Admin;