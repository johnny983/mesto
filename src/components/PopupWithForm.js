import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
      super(popupSelector)
      this._handleFormSubmit = handleFormSubmit
      this._form = this._popup.querySelector('.popup__form')
    }
  
    _getInputValues() {
      this._inputsList = this._form.querySelectorAll('.popup__input')
      this._formValues = {}
      this._inputsList.forEach((input) => { 
        this._formValues[input.name] = input.value
      })
      return this._formValues
    }

    _handleSubmit = () => {
      this._handleFormSubmit(this._getInputValues())
    }
  
    close() {
      super.close()
      this._form.reset()
    }
  
    setEventListeners() {
      super.setEventListeners()
      this._form.addEventListener('submit', this._handleSubmit)
    }
  } 