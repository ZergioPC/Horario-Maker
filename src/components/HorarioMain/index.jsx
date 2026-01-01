import React from "react";

const HorarioMain = ({ renderTabs, renderTable })=>{
  //console.log(children);
  
  return (
    <main>
      {renderTabs()}
      {renderTable()}
    </main>
  );
}

export { HorarioMain };