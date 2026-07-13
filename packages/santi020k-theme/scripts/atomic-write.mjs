import { randomUUID } from 'node:crypto'
import { renameSync, rmSync, writeFileSync } from 'node:fs'

export const writeFileAtomicSync = (target, contents) => {
  const temporary = `${target}.${process.pid}.${randomUUID()}.tmp`

  try {
    writeFileSync(temporary, contents)

    renameSync(temporary, target)
  } finally {
    rmSync(temporary, { force: true })
  }
}
