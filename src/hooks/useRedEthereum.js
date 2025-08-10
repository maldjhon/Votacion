import { useEffect, useState } from "react";
import { ethers } from "ethers";

// ID de red aceptada: Sepolia (11155111)
const RED_ACEPTADA = 11155111;

export function useRedEthereum() {
  const [redValida, setRedValida] = useState(null);
  const [nombreRed, setNombreRed] = useState("");

  useEffect(() => {
    const detectarRed = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        setRedValida( Number(network.chainId) === RED_ACEPTADA);
        setNombreRed(network.name);
      }
    };

    detectarRed();

    // Detectar cambios de red
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    return () => {
      window.ethereum.removeAllListeners("chainChanged");
    };
  }, []);

  return { redValida, nombreRed };
}
