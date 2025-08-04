import { useState} from "react";

export function Opcion(contrato){
    const [estado, setEstado] = useState("");

    const votacion = async (opcion)=>{
        try{
            setEstado("");
            const tx = await contrato.votar(opcion);
            setEstado("⏳ En progreso...");
            await tx.wait();
            setEstado("✅ Gracias por tu voto");
        }catch(error){
            console.log(error.reason);
            let mensaje = error.reason
            setEstado(`❌ Error al intentar votar: ${mensaje}`);
        }
    }

    return {estado,votacion};
}