import React, { useState } from 'react';
import { Redirect} from "react-router-dom";

import './css/selecionarTime.css'

export default function Footer(props) {
    const [redirect, setRedirect] = useState(false);

    return(
        <div className="footer container">
            {redirect && <Redirect to={{ pathname: "/escalacao" }} />}

        <div className="button-quadrado" onClick={() => setRedirect(true)}>
            <div className="quadrado"></div>
        </div>
        <div className="aleatorio">
            <h1>Aleatório</h1>
        </div>
    </div>
    )
}