import { useState } from 'react'
import { useW3Up } from './useW3Up'

export function useIPFS() {
  const { client, ready } = useW3Up()
  const [subiendo, setSubiendo] = useState(false)
  const [cid, setCid] = useState(null)
  const [error, setError] = useState(null)

  const subirArchivo = async (archivo) => {
    if (!ready || !client) {
      setError('Cliente IPFS no está listo aún.')
      return
    }

    try {
      setSubiendo(true)
      setError(null)
      setCid(null)

      const cidObtenido = await client.uploadFile(archivo)
      setCid(cidObtenido.toString())

      console.log('✅ Archivo subido con CID:', cidObtenido.toString())
    } catch (err) {
      console.error('❌ Error al subir archivo a IPFS:', err)
      setError('No se pudo subir el archivo a IPFS')
    } finally {
      setSubiendo(false)
    }
  }

  return {
    subirArchivo,
    cid,
    subiendo,
    error
  }
}