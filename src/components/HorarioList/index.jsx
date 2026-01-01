import React from "react";

const HorarioList = ({items})=>{
  return (
    <ul>
      {items.map( item => (<li key={item}>{item}</li>))}
    </ul>
  );
}

export { HorarioList };