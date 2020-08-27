import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector, item) {
      super(popupSelector)
      
      this._image = this._popup.querySelector('.popup__image')
    }
    open(item) {
      super.open()
      this.item = item
      this._image.src = this.item.link
      this._image.alt = this.item.alt
      this._popup.querySelector('.popup__caption').textContent = this.item.name
    }
  }