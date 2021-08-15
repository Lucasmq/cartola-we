import React ,{ useState } from 'react';
import '../css/time.css';
import bola from '../../img/bola.png'
import bola_vermelha from '../../img/bola_vermelha.png'
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
    let campo = URL+"img/"+props.formacao+".jpg";
    let bancoReserva = "";
    if(props.formacao === '-'){
        bancoReserva =  URL+"img/bot"+props.formacao+".jpg";
    }else {
        bancoReserva = URL+"img/bot"+props.player+".jpg";
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
            // for 2 amarelos ou um vermelho, retorna o vermelho por enquanto
            if(scoutCartao["CV"] || scoutCartao["CA"] === 2){
                return cartoes[0];
            }
        }
        return cartoes[2];        
    }

    // função para marcar o jogador como expulso
    function expulso(scout){
        if(scout){
            if(scout["CV"] || scout["CA"] === 2){
                return "expulso";
            }
            return "";
        }
        return "";
    }

    function mostraInfoCartaoGol(index, isCap){
        // style={{marginLeft : "-10px"}}
        // style={ isCap ? {marginLeft : "10px"} : {zIndex : 5}}
        const cartoes = <div className={cartao(props.scout)} ></div>;
        const bolaGol = <><img src={bola} alt="bola de futebol gol a favor" ></img></>
        const bolaGolContra = <img src={bola_vermelha} alt="bola de futebol gol contra" ></img>

        // let teste = Object.assign({},bolaGol,bolaGolContra);

        function gol(){
            if(props.scout){
                let gols = [];
                if(props.scout["G"]){
                    for (let i = 0; i < props.scout["G"]; i++) {
                        gols.push(bolaGol);
                    }
                }
                if(props.scout["GC"]){
                    for (let i = 0; i < props.scout["GC"]; i++) {
                        gols.push(bolaGolContra);
                    }
                }
                return gols;
            }
            return [];
        }

        // console.log(teste);
        
        const gols = <div className={"gol"}>
                {gol().map((gol,index) =>(
                    <React.Fragment key={index}>{gol}</React.Fragment>
                ))}
                {/* {bolaGolContra} */}
            </div>

        const pontosPosicao =   (<>
                                    <h3 className="pontos" >{props.pontos}</h3> 
                                    <div className={props.posClass} >{props.pos}</div> 
                                </>)

        if(index === "cartao"){
            return cartoes;
        }else if(index === "gol") {
            return gols;
        }

        return pontosPosicao;

    }
    // console.log(props.mostrarCartaoGol);

    return (
        <div onMouseLeave={() => props.jogadorSelecionado(null,null,null,null,null,null,false)} 
             onMouseEnter={() => props.jogadorSelecionado(props.scout, props.nome, props.pos,props.fotoJogador,props.clubeIdJogador,props.pontos,props.timeMotando)} 
             className={"time1-jogador "+expulso(props.scout)}
             style={{background: props.reserva ? "#737eb3" : "#898989"}}>

            <h3 className="nome">{props.nome}</h3>
            {props.isCap &&  <img className={"cap-" + props.player} src={bracedeiraCap} alt="capitão" /> }
            {mostraInfoCartaoGol(props.mostrarCartaoGol, props.isCap)}             
        </div>
    )
}

function Jogadores(props) {
    const [indexMostraCartaoGol, setIndexMostraCartaoGol] = useState(0);
    
    const [mostrarCartaoGol] = useState(["posicoes","cartao","gol"]);
    
    function mostraCartaoGol(direcao){

        if(direcao === 1){
            if(indexMostraCartaoGol <= mostrarCartaoGol.length-1){
                setIndexMostraCartaoGol((indexMostraCartaoGol+1)%3);
            }   
        }else if(direcao === -1){
            if(indexMostraCartaoGol === 0){
                setIndexMostraCartaoGol(2);
            }
            if(indexMostraCartaoGol > 0){
                setIndexMostraCartaoGol((indexMostraCartaoGol-1)%3);
            }
        }
    }

    return (
        <div  className="time1-elenco">
            <div className="time1-elenco-header">
                <div className="seta-esquerda"></div>
                <h3 className="l1" onClick={() => mostraCartaoGol(-1)}>L1</h3>
                <div className="seta-direita"></div>
                <h3 className="r1" onClick={() => mostraCartaoGol(1)}>R1</h3>
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
                                mostrarCartaoGol={mostrarCartaoGol[indexMostraCartaoGol]}
                                scout={jogador.scout} 
                                fotoJogador={jogador.foto}
                                clubeIdJogador={jogador.clube_id}
                                timeMotando={props.time.montou_time}
                                reserva={jogador.reserva}
                                />
                                ))}
                    {props.time.reservas && props.time.reservas.map((jogador,index) => (
                        <Jogador jogadorSelecionado={props.jogadorSelecionado}
                                key={index}
                                nome={jogador.apelido}    
                                pontos={jogador.pontos_num} 
                                posClass={jogador.posicao_classe} 
                                pos={jogador.posicao} 
                                isCap={jogador.capitao} 
                                player={props.player} 
                                mostrarCartaoGol={mostrarCartaoGol[indexMostraCartaoGol]}
                                scout={jogador.scout} 
                                fotoJogador={jogador.foto}
                                clubeIdJogador={jogador.clube_id}
                                timeMotando={props.time.montou_time}
                                reserva={jogador.reserva}
                                style={{color: "red"}}
                                />
                                ))}
                </div>
        </div>
    )
}

export default function Time(props) {
    return (
        <>
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