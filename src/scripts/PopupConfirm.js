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
    // this.close()
  }

close() {
    super.close()
    if(this._popupSelector === '.popup_confirm')
    this._popupForm.removeEventListener('submit', this._removeCard)
}

setEventListeners() {
    super.setEventListeners()
    if(this._popupSelector === '.popup_confirm')
    this._popupForm.addEventListener('submit', this._removeCard)
}

_removeCard = () => {
    event.preventDefault()
    this._removeCardHandler()
  }
}