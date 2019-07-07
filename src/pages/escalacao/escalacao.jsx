import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../components/css/time.css'
import Time from '../../components/time/time'
import Menu from '../../components/menu/menu'
import Footer from '../../components/footer/footer'
import Scout from '../../components/scouts/scout'


const URL = "https://cartola-we-api.herokuapp.com/"
   
const menuHover = new Audio();
      menuHover.src = URL+'/audio/hover_menu.mp3'
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
    const [scoutDoJogador, setScoutDoJogador] = useState(null);
    const [nomeJogador, setNomeJogador] = useState(null);
    const [posicaoJogador, setPosicaoJogador] = useState(null);


    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(URL+"time/"+localStorage.getItem("timeIdcasa"));
            const time = response.data.time;
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

    function jogadorSelecionado(scout,nomeJogador, posicao){
        setScoutDoJogador(scout);
        setNomeJogador(nomeJogador);
        setPosicaoJogador(posicao);
    }

    return (
        <>
        {timeCasa && timeFora && (
            <>
                <div className="container-escalacao">
                    <Time player={1} 
                          jogadorSelecionado={jogadorSelecionado} 
                          nomeTime="Ocraus FC" 
                          time={timeCasa} />
                    <div className="center-container">
                        {scoutDoJogador ?
                             <Scout scout={scoutDoJogador} 
                                    nomeJogador={nomeJogador} 
                                    pos={posicaoJogador}/>
                            :
                            <Menu musicMenu={playMenuHover} musicSelecao={clickMenu} timeCasa={timeCasa} timeFora={timeFora} />
                        }
                    </div>
                    <Time player={2} jogadorSelecionado={jogadorSelecionado} nomeTime="Flamengo" time={timeFora} />
                </div>
                <Footer mute={mute} estadoMusica={mutado} />
            </>
        )}
            
        </>
    );
}


export default Escalacao;
