/**
 * Elaborates average running speed from time in [HH:]mm:ss:x string format and covered distance in meters.
 *
 * Used in run statistics page.
 */
export function getAVGSpeed(time: string, length: number): string {
  // 1. parse time info
  let timeInSeconds = 0
  const timeChunks = time.split(':') // split [HH:]mm:ss:x string
  // sum chunks
  if (timeChunks.length === 4) { // time contains hours...
    if (parseInt(timeChunks[3]) >= 5) { // round miliseconds
      timeInSeconds = 1
    }
    timeInSeconds += parseInt(timeChunks[2])
    timeInSeconds += parseInt(timeChunks[1]) * 60
    timeInSeconds += parseInt(timeChunks[0]) * 3600
  } else { // time only consists from mins and secs...
    if (parseInt(timeChunks[2]) >= 5) { // round miliseconds
      timeInSeconds = 1
    }
    timeInSeconds += parseInt(timeChunks[1])
    timeInSeconds += parseInt(timeChunks[0]) * 60
  }

  // 2. elaborate avg speed from time and length
  const speedMs = length / timeInSeconds
  const speedKmh = (speedMs * 3.6).toFixed(3)

  if (speedMs < 2.7777777777777777) {
    return '0' + speedKmh
  } else {
    return speedKmh
  }
}

/**
 * Counts 2 times in [HH:]mm:ss:x string format.
 *
 * Used in run statistics page.
 */
export function sumTimes(time1: string, time2: string): string {
  const timeChunks_1 = time1.split(':').map(c => parseInt(c)) // split [HH:]mm:ss:x string
  if (timeChunks_1.length < 4) { // normalize to 4 pcs format if needed
    timeChunks_1[3] = timeChunks_1[2]
    timeChunks_1[2] = timeChunks_1[1]
    timeChunks_1[1] = timeChunks_1[0]
    timeChunks_1[0] = 0
  }
  const timeChunks_2 = time2.split(':').map(c => parseInt(c)) // split [HH:]mm:ss:x string
  if (timeChunks_2.length < 4) { // normalize to 4 pcs format if needed
    timeChunks_2[3] = timeChunks_2[2]
    timeChunks_2[2] = timeChunks_2[1]
    timeChunks_2[1] = timeChunks_2[0]
    timeChunks_2[0] = 0
  }
  // count together
  const output = [0, 0, 0, 0]
  let temp = 0
  // miliseconds
  output[3] = timeChunks_1[3] + timeChunks_2[3]
  if (output[3] > 9) {
    temp = 1
  }
  output[3] = output[3] % 10
  // seconds
  output[2] = timeChunks_1[2] + timeChunks_2[2] + temp
  temp = Math.floor(output[2] / 60)
  output[2] = output[2] % 60
  // minutes
  output[1] = timeChunks_1[1] + timeChunks_2[1] + temp
  temp = Math.floor(output[1] / 60)
  output[1] = output[1] % 60
  // hours
  output[0] = timeChunks_1[0] + timeChunks_2[0] + temp
  //
  return `${output[0]}:${output[1].toFixed(2)}:${output[2].toFixed(2)}:${output[3]}`
}
