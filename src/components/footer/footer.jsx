import React from 'react';
import '../css/time.css';

const somOn = 'https://cartola-we-api.herokuapp.com/img/somOn.png';
const somOff = 'https://cartola-we-api.herokuapp.com/img/somOff.png';


export default function Footer(props){

    return(
        <footer >
            <div onClick={() => props.mute()} className="menu-select"> 
                <div className="select-container">
                    <div className="botao-select"></div>
                    <span className="select">Select</span>
                </div>
                {/* <div className="help"></div> */}
                <img className='som' src={props.estadoMusica ? somOff : somOn} alt='som'/>
            </div>
        </footer>
    )
}