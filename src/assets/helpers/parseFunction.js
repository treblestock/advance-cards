export default function parseFunction (fn) {
  // const fnRaws = fn.toString()
  // const isDeclaration = !!fnRaws.match(/function|async function/)
  
  const body = fn.toString().match(/(?<={).*(?=})/s)[0].replace(/(\\r | \\n)/, '')
  return body
}