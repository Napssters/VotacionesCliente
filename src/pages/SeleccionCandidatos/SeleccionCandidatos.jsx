import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const API = process.env.REACT_APP_API;

export const SeleccionCandidatos = () => {
    const history = useHistory();

    let [candidatos, setCandidatos] = useState([]);

    const getCandidatos  = async () =>{
        const res = await fetch(`${API}/candidatosdata`);
        const data = await res.json();
        setCandidatos(data);
    }

    const redirect = async (id) => {
        const res = await fetch(`${API}/registrovotosdata/${id}`);
        const data = await res.json();
        await editNumVoto(data)
        window.alert("Voto realizado con exito")
        history.push('/')
    }

    const editNumVoto = async (info) =>{
        var nombre = info.nombre;
        var numvotos = Number(info.numvotos);
        numvotos += numvotos;
        if(info == null){
            const res = await fetch(`${API}/registrovotosdata/${info.id}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    numvotos,
                }),
            });
            await res.json();
        }else{
            const res = await fetch(`${API}/registrovotosdata/${info.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    numvotos,
                }),
            });
            const data = await res.json();
        }  
    }

    useEffect(() => {
        getCandidatos();
      }, []);

    return (
        <div className='vh-100 d-flex flex-column'>
            <div className="container text-center poss">
                <h2>Seleccion de Candidatos</h2>
            </div>
            <div className='flex-1 container-fluid d-flex justify-content-end align-items-end'>
                {candidatos.map((candidato)=>(
                    <div className="container card poss col-md-3 align-items-center">
                        <div className="card-header">
                            <h5 className='text-center'>{candidato.nombre}  {candidato.apellido}</h5>
                        </div>
                        <div className="card-body">
                            <img className='panel__image__seleccion' src={candidato.foto} alt="" />
                            <h6><br />Partido: <br />{candidato.partido}</h6>
                            <div className="container text-center">
                                <button 
                                    onClick={(e) => redirect(candidato.id)}
                                    className='btn btn-primary'
                                >
                                    Dar Votos
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
