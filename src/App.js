import React, {useState} from 'react';
// import Routes from './routes';
// import { BrowserRouter } from 'react-router-dom';

import Escalacao from './pages/escalacao/escalacao';
import BuscarTimes from './pages/selecionarTime/buscarTimes'


import './components/css/time.css';

function App() {
  // const [escalacao, setEscalacao] = useState(false);
  const [buscarTime, setBuscarTime] = useState(true);



  return (
    <>
      {buscarTime ? 
        <BuscarTimes setBuscarTime={setBuscarTime}/> :
        <Escalacao voltar={setBuscarTime} />
      }
    </>
  );
}

export default App;
