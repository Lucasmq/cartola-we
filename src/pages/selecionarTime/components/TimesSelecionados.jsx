import React, {useState} from 'react';
import axios from 'axios';

import './css/selecionarTime.css'
const URL = "https://cartola-we-api.herokuapp.com/times?q="

export default function TimesSelecionados(props) {
    
    return(
        <div className="times-nomes">
            <div className="container">
                <NomeTime   player={1} 
                            lugar={"Casa"} 
                            timesCasa={props.timesCasa} 
                            escolherTime={props.escolherTimeCasa}
                            nomeTime={props.infoTimeCasa}
                            />
                <Center escudoCasa={props.infoTimeCasa[1]} 
                        escudoFora={props.infoTimeFora[1]}
                        timesCasa={props.timesCasa}
                        timesFora={props.timesFora}
                        />
                <NomeTime   player={2} 
                            lugar={"Fora"} 
                            timesFora={props.timesFora} 
                            escolherTime={props.escolherTimeFora}
                            nomeTime={props.infoTimeFora}
                            />
            </div>
        </div>
    )
}

function Center(props) {
    return(
        <div className="center">
            <EscudoEscolhido player={1} escudo={props.escudoCasa} times={props.timesCasa}/>
            
            <div className="vs-escolha centraliza">
                <h1>vs</h1>
            </div>
            
            <EscudoEscolhido player={2} escudo={props.escudoFora} times={props.timesFora} />
        </div>
    )
}

function EscudoEscolhido(props) {
    return (
        <div className={"escudo-escolhido"+props.player}>
            { props.escudo && <img src={props.escudo} alt="escudo" />}
        </div>
    )
}
function NomeTime(props) {
    const [times, setTimes] = useState(null);
    const [nomeTime, setNomeTime] = useState("");
    
    async function buscaTime(){
        if(nomeTime){
            const response = await axios.get(`${URL}${nomeTime}`)
            const times = response.data;
            props.escolherTime(times);
            setTimes(times);
        }
    }

    function verificaEnter(e){
        if(e.key ==='Enter'){
            buscaTime();
        }
    }

    return(
        <div className={"time-nomes"+props.player} >
                <div className={"nome-lugar"+props.player}>
                    <h3>{props.lugar}</h3>
                </div>
                <div className={"nome-time"+props.player + (times ? " ": " inicio")}>
                    { times ?  <h2>{props.nomeTime[0]}</h2>: 
                    <>
                        {/* <button onClick={() => buscaTime()}>OK</button> */}
                        {/* {colo em OnClick para que quando eu clicar nele ele resetar, ai no lugar de placeholder, eu boto o valor que quero, ou não} */}
                        <input autoComplete="off" type="text" onKeyDown={(e)=> verificaEnter(e)} onChange={e => setNomeTime(e.target.value)} className="input-time" name="inputTime" value={nomeTime} placeholder="Buscar Time" ></input>
                        <div className={"button-bola"+props.player} onClick={() => buscaTime()}>
                            <div className={"bola"+props.player}>
                                <span>Buscar</span>    
                            </div>
                        </div>
                    </>
                    }
                </div>
        </div>
    )
}