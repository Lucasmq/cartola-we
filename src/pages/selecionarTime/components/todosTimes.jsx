import React, { useState, useEffect } from 'react';

import './css/selecionarTime.css'

export default function TodosTimes(props) {
    return (
        <div className="time-container container">
            {props.timesCasa ? 
            <Times lugar="casa" times={props.timesCasa} infoTimeHover={props.infoTimeHoverCasa}/> 
            :
            <TimesEstaticos times={props.timesCasa} lugar="casa" />
            }

            <div className="grafico-center">
                <div className="grafico">
                    <img src="https://cartola-we-api.herokuapp.com/img/grafico.PNG" alt="grafico" />
                </div>
            </div>
            {props.timesFora ? 
            <Times lugar="fora" times={props.timesFora} infoTimeHover={props.infoTimeHoverFora}/> 
            :
            <TimesEstaticos times={props.timesFora} lugar="fora" />
            }
        </div>
    )
}

function TimesEstaticos(props) {
    return (
        <div className={"time-" + props.lugar}>
            <div className={"times-escolha flex-coluna"}>
                <RegioesTimes numeroEscudos={5} nomeHeader={"Europa A"}/>
                <RegioesTimes numeroEscudos={5} nomeHeader={"Clubes"}/>
                <RegioesTimes numeroEscudos={1} nomeHeader={"Carregar dados"}/>

            </div>
        </div>
    )
}

function RegioesTimes(props) {
    return (
        <>
            <div className="time-nome margin-top">
                <div className="seta-esquerda"></div>
                <div className="r1" >r1</div>
                <h2 >{props.nomeHeader}</h2>
                <div className="l1">l1</div>
                <div className="seta-direita"></div>
            </div>
            <EscudosEstaticos numeroEscudos={props.numeroEscudos} />
        </>
    )
}

function EscudosEstaticos(props) {

    let numeroEscudos = [];

    for (let i = 0; i < props.numeroEscudos; i++) {
        numeroEscudos.push(<SomenteEscudo key={i} escudo={"http://imagensemoldes.com.br/wp-content/uploads/2017/11/BANDEIRA-DO-BRASIL-EM-VETOR-JPG-PNG-EDITAVEL-0l.png"} />)        
    }

    return (
        <div className="times-escudos ">
            {numeroEscudos}
        </div>
    )
}

function SomenteEscudo(props) {
    return (
        <div className="escudo">
            <img src={props.escudo} alt="escudo" />
        </div>
    )
}

function Times(props) {
    const [pag, setPag] = useState(0);
    const [maxPag, setMaxPag] = useState(0);

    useEffect(() => {
        setMaxPag(props.times.length);
        // console.log(maxPag);
    }, [maxPag, props.times])

    function next() {
        if (pag < maxPag - 1) {
            setPag(pag + 1);
        }
    }

    function prev() {
        if (pag > 0) {
            setPag(pag - 1);
        }
    }
    return (
        <div className={"time-" + props.lugar}>
            <div className="times-escolha">
                <div className="time-nome">
                    <div className="seta-esquerda"></div>
                    <div className="r1" onClick={prev} >r1</div>
                    <h2 >Cartola FC</h2>
                    <div className="l1" onClick={next} >l1</div>
                    <div className="seta-direita"></div>
                </div>
                <EscudosTimes times={props.times} pag={pag} infoTimeHover={props.infoTimeHover} lugar={props.lugar}/>
            </div>
        </div>
    )
}

function EscudosTimes(props) {
    return (
        <div className="times-escudos">
            {props.times[props.pag].map((time, index) => (
                <React.Fragment key={index}>
                    <Escudo escudo={time.url_escudo_png} 
                            fotoPerfil={time.foto_perfil} 
                            nome={time.nome} 
                            timeId={time.time_id} 
                            infoTimeHover={props.infoTimeHover} 
                            lugar={props.lugar}/>
                </React.Fragment>
            ))}
        </div>
    )
}


function Escudo(props) {

    return (
        <div className="escudo" onMouseOver={() => props.infoTimeHover(props.nome,props.escudo)} onClick={() => localStorage.setItem("timeId"+props.lugar, props.timeId)}>
            <img src={props.escudo} alt="escudo"/>
            <div className="foto-perfil">
                <img src={props.fotoPerfil} alt="foto-perfil" />
            </div>
        </div>
    )
}