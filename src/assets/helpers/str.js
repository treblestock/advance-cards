function toHumanCase(camelCase) {
  return camelCase.replaceAll(/[A-Z]/g, match => ' ' + match.toLowerCase() )
}


export { 
  toHumanCase,
}