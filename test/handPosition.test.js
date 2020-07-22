import { describe, expect, it } from '@jest/globals'

import { toHandPosition } from '../src/fromTime'

function getRandomHour () {
  return Math.floor(Math.random() * Math.floor(12))
}

describe('converting from time to degrees movement for clock hands', () => {
  it('each hour on the dial is 30 degrees', () => {
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(h => {
      expect(toHandPosition({ hours: h, minutes: 0, seconds: 0 }))
        .toHaveProperty('hours', 30 * h)
    })
  })
  it('this makes every five minutes 30 degrees', () => {
    [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].forEach(m => {
      expect(toHandPosition({ hours: 0, minutes: m, seconds: 0 }))
        .toHaveProperty('minutes', 30 * (m / 5))
    })
  })

  it('which makes every minute 6 degrees', () => {
    [...Array(60).keys()].forEach(m => {
      expect(toHandPosition({ hours: 0, minutes: m, seconds: 0 }))
        .toHaveProperty('minutes', m * 6)
    })
  })

  it('and every second 6 degrees', () => {
    [...Array(60).keys()].forEach(s => {
      expect(toHandPosition({ hours: 0, minutes: 0, seconds: s }))
        .toHaveProperty('seconds', s * 6)
    })
  })

  it('as the minute hand advances the hour hand moves between the hours by half a degree per minute', () => {
    const arbitraryHour = getRandomHour()
    const startDegrees = arbitraryHour * 30;

    [...Array(60).keys()].forEach(m => {
      expect(toHandPosition({ hours: arbitraryHour, minutes: m, seconds: 0 }))
        .toHaveProperty('hours', startDegrees + (0.5 * m))
    })
  })
})
