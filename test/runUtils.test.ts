import { describe, expect, test } from 'vitest'
import { getAVGSpeed } from '../shared/utils/runUtils'

describe('getAVGSpeed', () => {
  describe('time parsing', () => {
    test('parses mm:ss:x format', () => {
      // 10 min = 600 s, 6000 m => 10 m/s => 36 km/h
      expect(getAVGSpeed('10:00:0', 6000)).toBe('36.000')
    })

    test('parses mm:ss format without fractions', () => {
      expect(getAVGSpeed('10:00', 6000)).toBe('36.000')
    })

    test('parses H:mm:ss:x format', () => {
      // 1 h = 3600 s, 36000 m => 10 m/s => 36 km/h
      expect(getAVGSpeed('1:00:00:0', 36000)).toBe('36.000')
    })

    test('adds hours to the total time', () => {
      // 2 h 30 min = 9000 s, 90000 m => 10 m/s => 36 km/h
      expect(getAVGSpeed('2:30:00:0', 90000)).toBe('36.000')
    })
  })

  describe('rounding of fractional part', () => {
    test('rounds up one second when fraction is 5 or more (mm:ss:x)', () => {
      // 10:00:5 => 601 s, 6010 m => 10 m/s
      expect(getAVGSpeed('10:00:5', 6010)).toBe('36.000')
    })

    test('does not round up when fraction is below 5 (mm:ss:x)', () => {
      // 10:00:4 => 600 s, 6010 m => 10.0167 m/s => 36.06 km/h
      expect(getAVGSpeed('10:00:4', 6010)).toBe('36.060')
    })

    test('rounds up one second when fraction is 5 or more (H:mm:ss:x)', () => {
      // 1:00:00:5 => 3601 s, 36010 m => 10 m/s
      expect(getAVGSpeed('1:00:00:5', 36010)).toBe('36.000')
    })
  })

  describe('result formatting', () => {
    test('returns speed with three decimal places', () => {
      // 3600 s, 10001 m => 10.001 km/h
      expect(getAVGSpeed('1:00:00:0', 10001)).toBe('10.001')
    })

    test('prefixes zero when speed is below 10 km/h', () => {
      // 600 s, 1000 m => 6 km/h
      expect(getAVGSpeed('10:00:0', 1000)).toBe('06.000')
    })

    test('prefixes zero just below the 10 km/h threshold', () => {
      // 3600 s, 9999 m => 9.999 km/h
      expect(getAVGSpeed('1:00:00:0', 9999)).toBe('09.999')
    })

    test('does not prefix zero just above the 10 km/h threshold', () => {
      // 3600 s, 10001 m => 10.001 km/h
      expect(getAVGSpeed('1:00:00:0', 10001)).toBe('10.001')
    })
  })
})
