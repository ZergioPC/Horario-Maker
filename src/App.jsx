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
import { HorarioAbout } from './components/HorarioAbout';
import { HorarioAjustes } from './components/HorarioAjustes';

import { useHorariosTabs } from './hooks/useHorariosTabs';

function App() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalNuevoTab, setModalNuevoTab] = useState(false);
  const [modalAbout, setModalAbout] = useState(false);
  const [modalAjustes, setModalAjustes] = useState(false);

  const {
    materias,
    tabs,
    tabActivoId,
    conflictos,
    crearTab,
    cerrarTab,
    activarTab,
    crearMateria,
    eliminarMateria,
    toggleEnTablero,
    quitarDelTablero,
  } = useHorariosTabs();

  const tabActivo = tabs.find((tab) => tab.id === tabActivoId) ?? tabs[0];

  return (
    <>
      <HorarioHeader
        titulo="Horario Maker"
        autor="Sergio Palacios"
        onAbout={()=>setModalAbout(true)}
        onAjustes={()=>setModalAjustes(true)}
      />

      <HorarioAside>
        <HorarioBtnNewMat onClick={()=>setModalAbierto(true)}/>
        <HorarioList
          materias={materias}
          idsEnTablero={tabActivo?.idsEnTablero ?? []}
          onToggle={toggleEnTablero}
          onEliminar={eliminarMateria}
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

      <HorarioAbout
        abierto={modalAbout}
        onCerrar={()=>setModalAbout(false)}
      />

      <HorarioAjustes
        abierto={modalAjustes}
        onCerrar={()=>setModalAjustes(false)}
      />
    </>
  )
}

export default App
