"use strict"

// Включаем отображение элемента с текстом об ошибке в зависимости от id элемента добавлением класса, включаем отображение красной нижней границы инпута добавлением класса, текст ошибок по-умолчанию.

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
  };

// Выключаем отображение элемента с текстом об ошибке в зависимости от id элемента удалением класса, выключаем красную границу инпута удалением класса, текст ошибок пустой.

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
  };

// Проверяем инпуты на валидность, если инпут не валидный, вызываем включение ошибки, если инпут валидный, выключаем ошибку.

  const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };

// Записываем в переменную коллекцию инпутов, на каждый инпут вешаем обработчик на событии "input", который вызывает функции проверки валидности и включения/выключения кнопки.

  const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config)
      });
    });
  };

// Записываем в переменную все формы на странице, для каждой формы делаем отмену дефолтного поведения на submit передаем форму в функцию установки обработчиков на инпуты.
  
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
      formElement.addEventListener('submit', (event) => {
        event.preventDefault()
      })
        setEventListeners(formElement, config)
    })
  }

// Проверяем на наличие не валидных инпутов, получаем все инпуты и проверяем есть ли среди них не валидный.


  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

// Включаем/выключаем кнопку в зависимости от результата функции hasInvalidInput путем добавлени/   удаления класса и установки/удаления аттрибута disabled.

  const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass)
      buttonElement.setAttribute('disabled', '')    
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass)
      buttonElement.removeAttribute('disabled')
    }
  }

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });