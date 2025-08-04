import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "../components/config";

export function useContrato() {
  const [contrato, setContrato] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const instancia = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        setContrato(instancia);
      }
    };
    init();
  }, []);

  return contrato;
}