import { useState, useEffect } from "react";

export function Resultados(contrato){
    const [listas,Votos] = useState([]);
    const cargarVotos = async ()=>{
        if(contrato){
            const lista = await contrato.obtenerVotos();
            Votos(lista);
        }
    }
    useEffect(()=>{
        if (!contrato) return;
        cargarVotos();

        const onVotoEmitido =()=>{
            cargarVotos();
        }
        contrato.on("VotoEmitido",onVotoEmitido);
        return ()=>{
            contrato.off("VotoEmitido",onVotoEmitido);
        };
    },[contrato])
    return {listas};
}