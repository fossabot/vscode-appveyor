import { spawn, SpawnOptions } from 'child_process'

export default async function (
  command: string,
  args: string[] = [],
  options: SpawnOptions = {},
): Promise<any> {
  return new Promise((resolve, reject) => {
    let res, stderr = '', stdout = ''

    try {
      const batch = spawn(command, args, options)

      batch.stdout.on('data', function (data) {
        stdout += data.toString()
      })

      batch.stderr.on('data', data => stdout += data.toString())
      batch.stderr.on('data', data => stderr += data.toString())

      batch.on('close', function () {
        if (stderr !== '') return reject(stderr.trim())

        resolve(stdout)
      })
    }
    catch (err) {
      reject(err)
    }
  })
}
