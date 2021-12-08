export default {
  validate (buffer) {
    return (buffer.toString('ascii', 0, 2) === 'BM')
  },

  calculate (buffer) {
    return {
      height: Math.abs(buffer.readInt32LE(22)),
      width: buffer.readUInt32LE(18)
    }
  }
}
