// Abstract reading multi-byte unsigned integers
export default function readUInt (buffer, bits, offset, isBigEndian) {
  offset = offset || 0
  const endian = isBigEndian ? 'BE' : 'LE'
  const methodName = ('readUInt' + bits + endian)
  return buffer[methodName](buffer, offset)
}
