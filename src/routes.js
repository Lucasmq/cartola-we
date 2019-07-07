import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Escalacao from './pages/escalacao/escalacao';
import BuscarTime from './pages/selecionarTime/buscarTimes';

export default function Routes(){

    return (
        <Switch>
            <Route path="/" exact component={props => <BuscarTime/>} />
            <Route path="/escalacao" component={props => <Escalacao />} />
        </Switch>
    )
}