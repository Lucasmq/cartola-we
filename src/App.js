import React, {useState} from 'react';

import Escalacao from './pages/escalacao/escalacao';
import BuscarTimes from './pages/selecionarTime/buscarTimes'

import './components/css/time.css';

function App() {
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
