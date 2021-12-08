const SIGNATURE = 'KTX 11'

export default {
  validate (buffer) {
    return SIGNATURE === buffer.toString('ascii', 1, 7)
  },

  calculate (buffer) {
    return {
      height: buffer.readUInt32LE(40),
      width: buffer.readUInt32LE(36)
    }
  }
}
