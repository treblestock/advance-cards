function download(fileName = 'untitled', blob) {
  const urledData = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = fileName
  link.href = urledData

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  window.URL.revokeObjectURL(urledData)
}
export default function downloadJson(fileName, data) {
  const json = JSON.stringify(data)
  const blob = new Blob([json], { type: 'application/json' })
  
  download(fileName, blob)
}

export function fetchDownload(url, options, filename = 'untitled') {
  fetch(url, options)
    .then(resp => resp.blob() )
    .then(blob => download(filename, blob) )
}