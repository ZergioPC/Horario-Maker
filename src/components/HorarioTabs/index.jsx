import React from "react";

const HorarioTabs = ({tabs})=>{
  return (
    <nav>
      {tabs.map(tab => <button key={tab}>{tab}</button>)}
    </nav>
  );
}

export { HorarioTabs };