import React from "react";

import { HorarioModal } from "../HorarioModal";

const HorarioAjustes = ({ abierto, onCerrar })=>{
  return (
    <HorarioModal
      abierto={abierto}
      onCerrar={onCerrar}
      titulo="Ajustes"
    >
      {/* Agrega aquí las opciones y ajustes futuros */}
    </HorarioModal>
  );
}

export { HorarioAjustes };
