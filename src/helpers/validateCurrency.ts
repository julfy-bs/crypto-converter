export const validateCurrency = (event: KeyboardEvent) => {
  const keyCodes: number[] = [8, 9, 12, 13, 16, 17, 18, 20, 27, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 91]
  const isAllowed = keyCodes.includes(event.keyCode)
  const isControlPressed = event.metaKey || event.ctrlKey

  if (!isAllowed && !isControlPressed) {
    event.returnValue = false
  } else if (isControlPressed) {
    event.returnValue = true
  }
}