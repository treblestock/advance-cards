export default function ({onload, onerror}) {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.style.display = 'none'


  function onchange(event) {
    const input = event.target
    const files = Array.from(input.files)

    function handleFile(file) {

    }

    Promise.all(
      files.map(file => new Promise(resolve => {
        const fileName = file.name
  
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
          const data = reader.result
          onload(fileName, data)
          resolve()
        }
        reader.onerror = () => {
          return reader.error
        }
      }))
    ).finally(res => document.body.removeChild(input))
  }

  input.addEventListener('change', onchange)

  document.body.appendChild(input)
  input.click()
}