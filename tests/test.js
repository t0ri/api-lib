/* eslint-disable no-undef */
require('../src/index.js')

// test('', () => {})

describe('Weather object created', () => {
  test('with an object', () => {
    expect(new Weather()).toBe(new Weather())
  })
})
