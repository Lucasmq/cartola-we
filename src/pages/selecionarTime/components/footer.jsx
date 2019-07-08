import React from 'react';

// import { Redirect} from "react-router-dom";

import './css/selecionarTime.css'

export default function Footer(props) {
    // const [redirect, setRedirect] = useState(false);

    return (
        <div className="footer container">
            <div className="aleatorio-container">
                <div className="button-quadrado" >
                    <div className="quadrado"></div>
                </div>
                <div className="aleatorio">
                    <h1>Aleatório</h1>
                </div>
            </div>


            <div className={"button-confirma-escalacao"} onClick={() => props.setBuscarTime(false)}>
                <div className={"bola"}>
                </div>
                    <h1>Confirmar</h1>
            </div>
        </div>
    )
}