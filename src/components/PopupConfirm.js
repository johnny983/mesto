import Popup from './Popup.js'

export default class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

removeCardHandler(handler) {
    this._removeCardHandler = handler
}

localCardRemove(cardToDelete) {
    cardToDelete.remove()
  }

setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', this._removeCard)
}

_removeCard = () => {
    event.preventDefault()
    this._removeCardHandler()
  }
}