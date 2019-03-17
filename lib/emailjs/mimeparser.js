import MimeNode from './node.js'

export default function parse (chunk) {
  const root = new MimeNode()
  //const lines = (typeof chunk === 'object' ? String.fromCharCode.apply(null, chunk) : chunk).split(/\r?\n/g)
  const lines = (chunk.charAt ? chunk : chunk.reduce((data, byte) => data + String.fromCharCode(byte), '')).split(/\r?\n/g)
  lines.forEach(line => root.writeLine(line))
  root.finalize()
  return root
}
