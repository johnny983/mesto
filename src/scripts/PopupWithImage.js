import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector, item) {
      super(popupSelector)
      this._item = item
      this._image = this._popup.querySelector('.popup__image')
    }
    open() {
      super.open()
      this._image.src = this._item.link
      this._image.alt = this._item.alt
      this._popup.querySelector('.popup__caption').textContent = this._item.name
    }
  }