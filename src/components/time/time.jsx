import React ,{ useState } from 'react';
import '../css/time.css';

const URL = 'https://cartola-we-api.herokuapp.com/'

function Header(props) {
    return (
        <div className="time1-header">
            <img src={props.escudo} alt="escudo" />
            <h2>{props.nomeTime}</h2>
        </div>
    )
}

function Escalacao(props) {
    let campo = URL+"img/"+props.formacao+".png";
    let bancoReserva = "";
    if(props.formacao === '-'){
        bancoReserva =  URL+"img/bot"+props.formacao+".png";
    }else {
        bancoReserva = URL+"img/bot"+props.player+".png";
    }
    return (
        <div className="time1-escalacao">
            <div className="time1-formacao">
                <div className="seta-esquerda"></div>
                <h3 className="l2">L2</h3>
                <h3 className="esquema">{props.formacao}</h3>
                <div className="seta-direita"></div>
                <h3 className="r2">R2</h3>
            </div>
            <div className={"time"+props.player+"-campo"}>
                <img className="campinho" src={campo} alt="campo"/>
                <img className="campinho-bot" src={bancoReserva} alt="campo"/>
            </div>
            <div className="time1-banco">

            </div>
        </div>
    )
}

function Jogador(props) {

    let bracedeiraCap = URL+"img/CAP_"+props.player+".png";
    function cartao(scoutCartao){
        let cartoes = ["cartao-vermelho" , "cartao-amarelo", "sem-cartao"];
        if(scoutCartao){
            if(scoutCartao["CA"]){
                return cartoes[1];
            }
            if(scoutCartao["CV"] || scoutCartao["CA"] === 2){
                return cartoes[0];
            }
            return cartoes[2];
        }
    }

    function expulso(scout){
        if(scout){
            if(scout["CV"] || scout["CA"] === 2){
                return "expulso";
            }
            return "";
        }
    }
    return (
        <div onMouseLeave={() => props.jogadorSelecionado(null,null,null)} onMouseEnter={() => props.jogadorSelecionado(props.scout, props.nome, props.pos)} className={"time1-jogador "+expulso(props.scout)}>
            <h3 className="nome">{props.nome}</h3>
            {props.isCap &&  <img className={"cap-" + props.player} src={bracedeiraCap} alt="capitão" /> }
            {props.mostrarCartao ? 
                (<div className={cartao(props.scout)}></div>)
                :
                (<>
                    <h3 className="pontos">{props.pontos}</h3> 
                    <div className={props.posClass} >{props.pos}</div> 
                </>)
        }
             
        </div>
    )
}

function Jogadores(props) {
    const [mostrarCartao, setMostrarCartao] = useState(null);
    function mostraCartoes(){
        setMostrarCartao(!mostrarCartao);
    }

    return (
        <div  className="time1-elenco">
            <div className="time1-elenco-header">
                <div onClick={() => props.teste(2)} className="seta-esquerda"></div>

                <h3 className="l1" onClick={() => mostraCartoes()}>L1</h3>
                <div className="seta-direita"></div>
                <h3 className="r1" onClick={() => mostraCartoes()}>R1</h3>
            </div>
            {/* {console.log()} */}
                <div className="time1-elenco-container">
                    {props.time.atletas.map((jogador,index) => (
                        <Jogador jogadorSelecionado={props.jogadorSelecionado}
                                key={index}
                                nome={jogador.apelido}    
                                pontos={jogador.pontos_num} 
                                posClass={jogador.posicao_classe} 
                                pos={jogador.posicao} 
                                isCap={jogador.capitao} 
                                player={props.player} 
                                mostrarCartao={mostrarCartao}
                                scout={jogador.scout} />
                    ))}
                </div>
        </div>
    )
}

export default function Time(props) {
    return (
        <>
        {/* {console.log(props.time)} */}
        {props.time && 
            (<div className={"time" + props.player}>
                <Header nomeTime={props.time.time_info.nome} escudo={props.time.time_info.escudo_url}/>
                <Escalacao formacao={props.time.esquema} player={props.player}/>
                <Jogadores  player={props.player} 
                            time={props.time} 
                            jogadorSelecionado={props.jogadorSelecionado} />

            </div>)}
        </>
        
    )
}