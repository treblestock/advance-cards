document.body.addEventListener('pointerdown', onPointerDown)

function onPointerDown (event) {
  // 
  var onSwipe = () => console.log('swiped...')
  event.target.addEventListener('swiperight', onSwipe)
  // 

  const onPointerMove = onPointerMoveCreator.bind(null, clearListeners, event)
  document.body.addEventListener('pointermove', onPointerMove)


  // clear
  var clearListeners = (event) => {
    console.log('cleared...')
    document.body.removeEventListener('pointermove', onPointerMove)
    document.body.removeEventListener('pointermove', onSwipe)
    document.body.removeEventListener('pointerup', clearListeners)
  }
  document.body.addEventListener('pointerup', clearListeners)
}
function onPointerMoveCreator (clearListeners, eventStart, eventMove) {
  const deltaCoords = {
    x: eventMove.clientX - eventStart.clientX,
    y: eventMove.clientY - eventStart.clientY,
  }
  
  if (deltaCoords.x >= 50) dispatchSwipeRight(eventStart.target, clearListeners)
  // if (deltaCoords.x <= -50) dispatchSwipeRight(eventStart.target)
}

function dispatchSwipeRight(target, clearListeners) {
  console.log(target)
  target.dispatchEvent(new Event('swiperight'))
  clearListeners()
  target.dispatchEvent(new Event('pointerup'))
}
// function dispatchSwipeLeft() {}
// function dispatchSwipeUp() {}
// function dispatchSwipeDonw() {}

export default {}
