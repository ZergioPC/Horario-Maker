import React from "react";

const HorarioAside = ({ renderBtn, renderList })=>{  
  return (
    <aside>
      {renderBtn()}
      {renderList()}
    </aside>
  );
}

export { HorarioAside };