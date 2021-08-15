import React, { useState } from 'react';

import TimesSelecionados from './components/TimesSelecionados';
import Header from './components/header';
import TodosTimes from './components/todosTimes';
import Footer from './components/footer';

import './components/css/selecionarTime.css'

export default function BuscarTimes(props){
    const [timesCasa, setTimesCasa] = useState(null);
    const [timesFora, setTimesFora] = useState(null);
    const [infoTimeCasa, setInfoTimeCasa] = useState(["Selecione um Time",""]);
    const [infoTimeFora, setInfoTimeFora] = useState(["Selecione um Time",""]);

    const [inicio, setInicio] = useState(true);


    function escolherTimeCasa(time){
        setTimesCasa(time);
        setInicio(false);
    }

    function escolherTimeFora(time){
        setTimesFora(time);
        setInicio(false);
    }

    

    function infoTimeHoverCasa(nomeTime,escudo){
        setInfoTimeCasa([nomeTime,escudo]);
    }
    function infoTimeHoverFora(nomeTime,escudo){
        setInfoTimeFora([nomeTime,escudo]);
    }

    return(
            <>
                <Header/>
                <TimesSelecionados  inicio={inicio} 
                                    escolherTimeCasa={escolherTimeCasa} 
                                    escolherTimeFora={escolherTimeFora} 
                                    timesFora={timesFora} 
                                    timesCasa={timesCasa}
                                    infoTimeCasa={infoTimeCasa}
                                    infoTimeFora={infoTimeFora}/>

                <TodosTimes timesCasa={timesCasa} 
                            timesFora={timesFora}  
                            inicio={inicio}
                            infoTimeHoverCasa={infoTimeHoverCasa}
                            infoTimeHoverFora={infoTimeHoverFora}/>
                <Footer setBuscarTime={props.setBuscarTime}/>
            </>
        
    )
}


