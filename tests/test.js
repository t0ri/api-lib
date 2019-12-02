/* eslint-disable no-undef */

require('../src/index.js')

describe('Weather object generated', () => {
  const weather = new Weather({ apiKey: '1429c4bd0156c07f3d7a9629c723828a', zip: 94108 })
  test('with an object', () => {
    expect(weather).toBeInstanceOf(Weather)
    expect(weather).toMatch(weather)
  })
  test('with correct keys', () => {
    expect(weather).toHaveProperty('cloudiness')
  })
})
