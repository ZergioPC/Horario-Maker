import { useState } from 'react';
import './App.css';

import { HorarioHeader } from './components/HorarioHeader';
import { HorarioTabs } from './components/HorarioTabs';
import { HorarioAside } from './components/HorarioAside';
import { HorarioBtnNewMat } from './components/HorarioBtnNewMat';
import { HorarioList } from './components/HorarioList';
import { HorarioMain } from './components/HorarioMain';
import { HorarioTable } from './components/HorarioTable';
import { HorarioModal } from './components/HorarioModal';
import { HorarioFormMat } from './components/HorarioFormMat';
import { HorarioModalNuevoTab } from './components/HorarioModalNuevoTab';

import { useHorariosTabs } from './hooks/useHorariosTabs';

const TEMP_DATA = [
  {
    id: crypto.randomUUID(),
    nombre: "Sociales",
    grupo: "MUL A",
    horas: [
      {dia:"LU", hora:8},
      {dia:"LU", hora:9},
      {dia:"LU", hora:10},
    ]
  },{
    id: crypto.randomUUID(),
    nombre: "Matematicas",
    grupo: "MUL B",
    horas: [
      {dia:"MA", hora:14},
      {dia:"MA", hora:15},
      {dia:"MI", hora:14},
    ]
  }
]

function App() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalNuevoTab, setModalNuevoTab] = useState(false);

  const {
    materias,
    tabs,
    tabActivoId,
    conflictos,
    crearTab,
    cerrarTab,
    activarTab,
    crearMateria,
    toggleEnTablero,
    quitarDelTablero,
  } = useHorariosTabs(TEMP_DATA);

  const tabActivo = tabs.find((tab) => tab.id === tabActivoId) ?? tabs[0];

  return (
    <>
      <HorarioHeader
        titulo="Horario Maker"
        autor="Sergio Palacios"
      />

      <HorarioAside>
        <HorarioBtnNewMat onClick={()=>setModalAbierto(true)}/>
        <HorarioList
          materias={materias}
          idsEnTablero={tabActivo?.idsEnTablero ?? []}
          onToggle={toggleEnTablero}
        />
      </HorarioAside>

      <HorarioMain>
        <HorarioTabs
          tabs={tabs}
          activoId={tabActivoId}
          onActivar={activarTab}
          onCerrar={cerrarTab}
          onCrear={()=>setModalNuevoTab(true)}
        />
        <HorarioTable
          conflictos={conflictos}
          onQuitar={quitarDelTablero}
        />
      </HorarioMain>

      <HorarioModal
        abierto={modalAbierto}
        onCerrar={()=>setModalAbierto(false)}
      >
        <HorarioFormMat
          onCrearMateria={(data)=>{
            crearMateria(data);
            setModalAbierto(false);
          }}
        />
      </HorarioModal>

      <HorarioModalNuevoTab
        abierto={modalNuevoTab}
        onCerrar={()=>setModalNuevoTab(false)}
        onCreate={(nombre)=>{
          crearTab(nombre);
          setModalNuevoTab(false);
        }}
      />
    </>
  )
}

export default App
