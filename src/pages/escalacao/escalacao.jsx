import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../components/css/time.css'
import Time from '../../components/time/time'
import Menu from '../../components/menu/menu'
import Footer from '../../components/footer/footer'
import Scout from '../../components/scouts/scout'
import Loading from '../loading/loading';


const URL = process.env.REACT_APP_URL_SERVER
   
const menuHover = new Audio();
      menuHover.src = URL+'audio/hover_menu.mp3'
      menuHover.preload = true;
const menuClick = new Audio();
      menuClick.src = URL+'audio/click_menu.mp3';
      menuClick.preload = true;
const backSong = new Audio(); 
      backSong.src = URL+'audio/funk-bomba-patch.mp3';
      backSong.preload = true;


function Escalacao(props) {
    const [timeCasa, setTimeCasa] = useState(null);
    const [timeFora, setTimeFora] = useState(null);
    const [mutado, setMutado] = useState(true);
    const [timeMontado, setTimeMontado] = useState(false);
    const [scoutDoJogador, setScoutDoJogador] = useState(null);
    const [nomeJogador, setNomeJogador] = useState(null);
    const [fotoJogador, setFotoJogador] = useState(null);
    const [pontuacaoJogador, setPontuacaoJogador] = useState(null);

    const [escudoClubeJogador, setEscudoClubeJogador] = useState(null);
    const [posicaoJogador, setPosicaoJogador] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(URL+"time/"+localStorage.getItem("timeIdcasa"));
            const time = response.data.time;
            console.log(time)
            setTimeCasa(time);
        }

        fetchData();
    }, [props.timeIdCasa])

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(URL+"time/"+localStorage.getItem("timeIdfora"));
            const time = response.data.time;
            setTimeFora(time);
        }

        fetchData();
    }, [props.timeIdFora])

    // useEffect(() => {
    //     playMusicBack();
    // }, [])

    async function playMusicBack() {
        try{
            await backSong.play();
            backSong.volume = 0.04;
            backSong.loop = Infinity;
        } catch(error){
            console.log(error);
        }
    }

    async function playMusic(music){
        try{
            await music.play(); 
        } catch(error){
            console.log(error);
        }
    }
    
    async function playMenuHover() {
        menuHover.pause();
        menuHover.currentTime = 0;
        await playMusic(menuHover);
    }

    async function clickMenu() {
        menuClick.pause();
        menuClick.currentTime = 0;
        await playMusic(menuClick);
    }

    async function mute() {
        if (mutado) {
            await playMusicBack();
        } else {
            backSong.pause();
        }
        setMutado(!mutado);
    }
    /* Recebe os dados dos jogadores selecionados na escalação para atualizar os scouts */
    function jogadorSelecionado(scout,nomeJogador, posicao, fotoJogador, clubeId, pontuacao, timeMontado){
        setScoutDoJogador(scout);
        setFotoJogador(fotoJogador);
        setEscudoClubeJogador(retornaEscudoClube(clubeId));
        setNomeJogador(nomeJogador);
        setPosicaoJogador(posicao);
        setPontuacaoJogador(pontuacao);
        setTimeMontado(timeMontado);
    }

    function retornaEscudoClube(clubeId){
        console.log(clubeId)
        if(clubeId && clubeId !== 1) {
            return timeCasa["clubes"] ? timeCasa["clubes"][clubeId]["escudos"]["45x45"] : timeFora["clubes"][clubeId]["escudos"]["45x45"]; 
        } else {
            return "https://cartolafc.globo.com/dist/6.11.1/img/emptystate_escudo.svg";
        }
    }

    useEffect(() => {
        if(timeCasa && timeFora){
            setTimeout(() => {
                setLoading(false);
              }, 500);
        }else{
            setLoading(true);
        }
    }, [timeCasa, timeFora])
    

    return (
        <>
        
            {loading && <Loading />}
                <div className="container-escalacao" hidden={loading ? true : false}>
                    <Time player={1} 
                          jogadorSelecionado={jogadorSelecionado} 
                          nomeTime="Ocraus FC" 
                          time={timeCasa} />
                    <div className="center-container">
                        {(timeMontado) ?
                             <Scout scout={scoutDoJogador} 
                                    nomeJogador={nomeJogador} 
                                    pos={posicaoJogador}
                                    fotoJogador={fotoJogador}
                                    escudoClubeJogador={escudoClubeJogador}
                                    pontuacao={pontuacaoJogador}
                                    />
                            :
                            <Menu musicMenu={playMenuHover} musicSelecao={clickMenu} timeCasa={timeCasa} timeFora={timeFora} />
                        }
                    </div>
                    <Time player={2} 
                          jogadorSelecionado={jogadorSelecionado} 
                          nomeTime="Flamengo" 
                          time={timeFora} />
                </div>
                <div hidden={loading ? true : false}>
                <Footer mute={mute} estadoMusica={mutado} voltar={props.voltar} />
                </div>
        </>
    );
}


export default Escalacao;
