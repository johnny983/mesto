export default class FormValidator {
  _showInputError(formElement, inputElement, errorMessage, config) {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      errorElement.textContent = errorMessage;
      inputElement.classList.add(config.inputErrorClass);
      errorElement.classList.add(config.errorClass);
    };

  _hideInputError(formElement, inputElement, config) {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      errorElement.textContent = '';
      inputElement.classList.remove(config.inputErrorClass);
      errorElement.classList.remove(config.errorClass);
    };

  _checkInputValidity(formElement, inputElement, config) {
      if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage, config);
      } else {
        this._hideInputError(formElement, inputElement, config);
      }
    };

  _hasInvalidInput(inputsList) {
      return inputsList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };

  _toggleButtonState(inputsList, buttonElement, config) {
      if (this._hasInvalidInput(inputsList)) {
        buttonElement.classList.add(config.inactiveButtonClass)
        buttonElement.setAttribute('disabled', '')    
      } else {
        buttonElement.classList.remove(config.inactiveButtonClass)
        buttonElement.removeAttribute('disabled')
      }
    }

  _setEventListeners(formElement, buttonElement, inputsList, config) {
    inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, config)
        this._toggleButtonState(inputsList, buttonElement, config)
      });
    });
  };
}