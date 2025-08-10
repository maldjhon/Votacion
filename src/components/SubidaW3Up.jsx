import { useState } from "react";
import { useIPFS } from "../hooks/useIPFS";

export function SubidaIPFS() {
  const [archivo, setArchivo] = useState(null);
  const { subirArchivo, cid, subiendo, error } = useIPFS();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (archivo) {
      subirArchivo(archivo);
    }
  };

  return (
    <div>
      <h3>Subir archivo a IPFS</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />
        <button type="submit">Subir</button>
      </form>
      <p>{subiendo}</p>
      <p>{error}</p>
      {cid && (
        <p>
          CID: <code>{cid}</code> <br />
          Ver:{" "}
          <a
            href={`https://ipfs.io/ipfs/${cid}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ipfs.io/ipfs/{cid}
          </a>
        </p>
      )}
    </div>
  );
}
