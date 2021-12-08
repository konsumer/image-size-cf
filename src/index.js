/* global fetch */
import Buffer from 'buffer'

import bmp from './types/bmp.js'
import cur from './types/cur.js'
import dds from './types/dds.js'
import gif from './types/gif.js'
import icns from './types/icns.js'
import ico from './types/ico.js'
import j2c from './types/j2c.js'
import jp2 from './types/jp2.js'
import jpg from './types/jpg.js'
import ktx from './types/ktx.js'
import png from './types/png.js'
import pnm from './types/pnm.js'
import psd from './types/psd.js'
import svg from './types/svg.js'
import webp from './types/webp.js'

const typeHandlers = {
  bmp,
  cur,
  dds,
  gif,
  icns,
  ico,
  j2c,
  jp2,
  jpg,
  ktx,
  png,
  pnm,
  psd,
  svg,
  webp
}

// This map helps avoid validating for every single image type
const firstBytes = {
  0x38: 'psd',
  0x42: 'bmp',
  0x44: 'dds',
  0x47: 'gif',
  0x49: 'tiff',
  0x4d: 'tiff',
  0x52: 'webp',
  0x69: 'icns',
  0x89: 'png',
  0xff: 'jpg'
}

function detectType (buffer) {
  const byte = buffer[0]
  if (byte in firstBytes) {
    const type = firstBytes[byte]
    if (type && typeHandlers[type].validate(buffer)) {
      return type
    }
  }
  return Object.keys(typeHandlers).find((key) => typeHandlers[key].validate(buffer))
}

async function getInfoFromUrl (url) {
  // get first chunk
  const r = await fetch(url)
  const reader = r.body.getReader()
  const { value } = await reader.read()
  const buffer = Buffer.from(value)
  return getInfoFromBuffer(buffer)
}

function getInfoFromBuffer (buffer) {
  const type = detectType(buffer)
  if (type) {
    return { type, ...typeHandlers[type].calculate(buffer) }
  }
}

const iface = { getInfoFromBuffer, getInfoFromUrl, detectType, typeHandlers }

export default iface
