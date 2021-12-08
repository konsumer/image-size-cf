import ICO from './ico.js'

const TYPE_CURSOR = 2
export default {
  validate (buffer) {
    if (buffer.readUInt16LE(0) !== 0) {
      return false
    }
    return buffer.readUInt16LE(2) === TYPE_CURSOR
  },

  calculate (buffer) {
    return ICO.calculate(buffer)
  }
}
