export default function ({onload, onerror}) {
  const input = document.createElement('input')
  input.type = 'file'
  input.style.display = 'none'


  function onchange(event) {
    const input = event.target
    const file = input.files[0]
    const fileName = file.name

    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      const data = reader.result
      onload({
        name: fileName,
        data,
      })
      document.body.removeChild(input)
    }
    reader.onerror = () => {
      return reader.error
    }
  }

  input.addEventListener('change', onchange)

  document.body.appendChild(input)
  input.click()
}