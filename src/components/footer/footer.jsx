import React from 'react';
import '../css/time.css';

const somOn = process.env.REACT_APP_URL_SERVER + "/img/somOn.png";
const somOff = process.env.REACT_APP_URL_SERVER + "/img/somOff.png";


export default function Footer(props){

    return(
        <footer >
            <div  className="menu-select"> 
                <div className="container-select-som" onClick={() => props.mute()}>
                    <div className="select-container">
                        <div className="botao-select"></div>
                        <span className="select">Select</span>
                    </div>
                    <img className='som' src={props.estadoMusica ? somOff : somOn} alt='som'/>
                </div>
                    {/* <div className="help"></div> */}
                <div className="button-container" onClick={() => props.voltar(true)}>
                    <div className="voltar">
                        <h1>Voltar</h1>
                    </div>
                    <div className="button-x" >
                        <div className="x"></div>
                    </div>
                </div>
            </div>

        </footer>
    )
}