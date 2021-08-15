import React from 'react';
import '../../css/time.css'

export default function PlacarInformativo(props){
    return (
        <div className="placar-container">
            <div className="placar-nome">
                <h3>{props.nomeInfo}</h3>
            </div>
            <div className="placar-info">
                <img className="placar-escudo1" src={props.escudo1} alt="escudo"/>
                <h3 className="pontos1">{props.valor1}</h3>
                <span className="vs" >vs</span>
                <h3 className="pontos2">{props.valor2}</h3>
                <img  className="placar-escudo2" src={props.escudo2} alt="escudo"/>            
            </div>
        </div>
    )
} 