import { useEffect, useState } from 'react'
import * as Client from '@web3-storage/w3up-client'

const DID = 'did:key:z6MkkUrEeKehQnhHxwgbhAoMTAxizYMdLWn3mHtV4f8fmK23' // Reemplaza por tu DID exacto

export function useW3Up() {
  const [client, setClient] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      const w3upclient = await Client.create()
      await w3upclient.login('jfmaldonado26@gmail.com')
      //await account.plan.wait()
      const space = w3upclient.spaces()
      let espacio = space[0].did()
      console.log(space[0].did())      
      await w3upclient.setCurrentSpace(espacio)
      setClient(w3upclient)
      setReady(true)
    }

    init()
  }, [])

  return { client, ready }
}
