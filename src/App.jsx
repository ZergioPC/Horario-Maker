import React from 'react';
import './App.css';

import { HorarioHeader } from './components/HorarioHeader';

import { HorarioAside } from './components/HorarioAside';
import { HorarioBtnNewMat } from './components/HorarioBtnNewMat';
import { HorarioList } from './components/HorarioList';

import { HorarioMain } from './components/HorarioMain';
import { HorarioTabs } from './components/HorarioTabs';
import { HorarioTable } from './components/HorarioTable';
import { HorarioItem } from './components/HorarioItem';

import { HorarioModal } from './components/HorarioModal';
import { HorarioFormMat } from './components/HorarioFormMat';

function App() {
  return (
    <>
    <HorarioHeader
      titulo="Horario Maker"
      autor="Sergio Palacios"
    />

    <HorarioAside
      renderBtn={()=> <HorarioBtnNewMat/>} 
      renderList={()=> <HorarioList items={[1,2,3]}/>} 
    />

    <HorarioMain
      renderTabs={()=> <HorarioTabs tabs={[1,2,3]}/>}
      renderTable={()=> <HorarioTable items={["a"]}/>}
    />

    <HorarioModal 
      renderNewMat={()=> <HorarioFormMat />}
    />
    </>
  )
}

export default App
