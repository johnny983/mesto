export default class FormValidator {
  constructor(config, formSelector) {
    this._config = config
    this._formElement = document.querySelector(formSelector)
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector)
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
  }

  _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      errorElement.textContent = errorMessage;
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.classList.add(this._config.errorClass);
    };

  _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      errorElement.textContent = '';
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
    };

  _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };

  _hasInvalidInput() {
      return this._inputsList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };

  _toggleButtonState() {
      if (this._hasInvalidInput(this._inputsList)) {
        this._buttonElement.classList.add(this._config.inactiveButtonClass)
        this._buttonElement.setAttribute('disabled', '')    
      } else {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass)
        this._buttonElement.removeAttribute('disabled')
      }
    }

  _setEventListeners() {
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

enableValidation() {
    this._setEventListeners()
    this._toggleButtonState()
    this._inputsList.forEach(inputElement => {
      this._hideInputError(inputElement)
    })
  }
}