import { useState } from 'react'
import { useContrato } from "./hooks/useVotacion";
import { Opcion } from "./hooks/useOpcion"
import {Resultados} from "./hooks/useResultados"
import {useRedEthereum} from "./hooks/useRedEthereum"
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const contrato = useContrato();
  const {estado,votacion} = Opcion(contrato);
  const {listas} = Resultados (contrato);  
  const { redValida, nombreRed } = useRedEthereum();

  if (redValida === false) {
    return (
      <div style={{ padding: "2rem", fontFamily: "Arial", color: "red" }}>
        ⚠️ Estás conectado a <strong>{nombreRed}</strong>, pero esta DApp solo funciona en Sepolia.  
        Por favor, cambia de red en MetaMask.
      </div>
    );
  }else{
    return (
      <>
        <div>
          <p>
            <button onClick={()=>{votacion(0)}}>Pizza</button>
            <button onClick={()=>{votacion(1)}}>Sushi</button>
            <button onClick={()=>{votacion(2)}}>Tacos</button>
          </p>
          <span>{estado}</span>
        </div>
        <div>
          <ul>
            <p><li>Piza: </li><span>{listas[0]}</span></p>
            <p><li>Sushi: </li><span>{listas[1]}</span></p>
            <p><li>Tacos: </li><span>{listas[2]}</span></p>
          </ul>
        </div>
      </>
    )
  }
}

export default App
