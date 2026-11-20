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
    if (parseInt(timeChunks[3] || '0') >= 5) { // round miliseconds
      timeInSeconds = 1
    }
    timeInSeconds += parseInt(timeChunks[2] || '0')
    timeInSeconds += parseInt(timeChunks[1] || '0') * 60
    timeInSeconds += parseInt(timeChunks[0] || '0') * 3600
  } else { // time only consists from mins and secs...
    if (parseInt(timeChunks[2] || '0') >= 5) { // round miliseconds
      timeInSeconds = 1
    }
    timeInSeconds += parseInt(timeChunks[1] || '0')
    timeInSeconds += parseInt(timeChunks[0] || '0') * 60
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
