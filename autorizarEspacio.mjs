import * as Client from '@web3-storage/w3up-client'
import fs from 'fs'

const client = await Client.create()

const spaces = await client.listSpaces()
const space = spaces[0]

if (!space) {
  console.log('❌ No hay espacio disponible para autorizar.')
  process.exit(1)
}

await client.setCurrentSpace(space.did())

const delegaciones = await client.exportDelegations()

if (!delegaciones.length) {
  console.log('❌ No hay delegaciones disponibles para exportar.')
  process.exit(1)
}

const delegacionJson = delegaciones[0].toJSON()
fs.writeFileSync('./delegacion.json', JSON.stringify(delegacionJson, null, 2))

console.log('✅ Delegación exportada correctamente como delegacion.json')
