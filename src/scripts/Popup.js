export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector)
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
  
    close() {
      document.removeEventListener('keydown', this._handleEscClose)
      this._popup.removeEventListener('click', this._handleOverlayClose)
      this._popup.classList.remove('popup_opened');
    }
  
    setEventListeners() {
      this._popup.querySelector('.popup__close-button').
      addEventListener('click', () => { this.close() })
    }
  
    open() {
      this._popup.classList.add('popup_opened');
      this._popup.addEventListener('click', this._handleOverlayClose)
      document.addEventListener('keydown', this._handleEscClose)
      this.setEventListeners()
    }
  }