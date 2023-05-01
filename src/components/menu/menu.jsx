import React, { useState } from 'react';
import '../css/time.css';
import PlacarInformativo from './opcoes/placarInformativo'

export default function Menu(props) {
    const [placarPontos , setPlacarPontos] = useState(false);
    const [placarPatrimonio , setPlacarPatrimonio] = useState(false);

return(
    <>
    <div className="menu-container">
        <div className="menu-header">
            <h2>Menu</h2>
        </div>
        
        {/* <PlayMusicaBack /> */}

        <div className="menu-content">
            <h3 onMouseEnter={() => props.musicMenu()} className="option-i">Inicio</h3>
            <h3 onMouseEnter={() => props.musicMenu()} onClick={() => props.musicSelecao(setPlacarPontos(!placarPontos))} className="option-p">Pontuação</h3>
            <h3 onMouseEnter={() => props.musicMenu()} className="option-i disabled">Substituição</h3>
            <h3 onMouseEnter={() => props.musicMenu()} className="option-p disabled">Mercado</h3>
            <h3 onMouseEnter={() => props.musicMenu()} className="option-i disabled">Ligas</h3>
            <h3 onMouseEnter={() => props.musicMenu()} className="option-p disabled">Scouts</h3>
            <h3 onMouseEnter={() => props.musicMenu()} className="option-i disabled">Posição</h3>
            <h3 onMouseEnter={() => props.musicMenu()} onClick={() => props.musicSelecao(setPlacarPatrimonio(!placarPatrimonio))} className="option-p">Cartoletas</h3>
        </div>
    </div>

    {(props.timeCasa) && (props.timeFora) && placarPontos && <PlacarInformativo   nomeInfo={"Pontuação"} 
                                                    valor1={props.timeCasa.pontos} 
                                                    valor2={props.timeFora.pontos} 
                                                    escudo1={props.timeCasa.time_info.escudo_url} 
                                                    escudo2={props.timeFora.time_info.escudo_url}/> }

    {(props.timeCasa) && (props.timeFora) && placarPatrimonio && <PlacarInformativo   nomeInfo={"Património C$"} 
                                                    valor1={props.timeCasa.patrimonio} 
                                                    valor2={props.timeFora.patrimonio} 
                                                    escudo1={props.timeCasa.time_info.escudo_url}                                                     
                                                    escudo2={props.timeFora.time_info.escudo_url}/> } 
                                                        
                                                    
    </>
    )
}