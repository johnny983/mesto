export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._popupSelector = popupSelector
    this._popupForm = this._popup.querySelector('.popup__form')
  }

  _handleEscClose = () => {
    if (event.key === "Escape") { 
      this.close()
    }
  }

  _handleOverlayClose = () => {
    if (event.target === event.currentTarget) { 
      this.close()
    }
  }

  removeCardHandler(handler) {
    this._removeCardHandler = handler
  }

  _removeCard = () => {
    event.preventDefault()
    this._removeCardHandler()
  }

  localCardRemove(cardToDelete) {
    cardToDelete.remove()
    this.close()
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose)
    this._popup.removeEventListener('click', this._handleOverlayClose)
    this._popup.classList.remove('popup_opened')
    if(this._popupSelector === '.popup_confirm')
    this._popupForm.removeEventListener('submit', this._removeCard)
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleOverlayClose)
    document.addEventListener('keydown', this._handleEscClose)
    this._popup.querySelector('.popup__close-button').
    addEventListener('click', () => { this.close() })
    if(this._popupSelector === '.popup_confirm')
    this._popupForm.addEventListener('submit', this._removeCard)
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners()
  }
}