"use strict"

import { config } from './validationConfig.js'
import { enableValidation } from './FormValidator.js'
import { initialCards } from './initialCardsData.js'
import { Card } from './Card.js'

// Находим элементы в DOM
const allPopups = document.querySelectorAll('.popup')

const editPopup = document.querySelector('.popup_edit')
const editPopupNameInput  = editPopup.querySelector('.popup__input_name')
const editPopupJobInput = editPopup.querySelector('.popup__input_job')
const editPopupForm = editPopup.querySelector('.popup__edit-form');

const addPopup = document.querySelector('.popup_add')
const addPopupTitleInput = addPopup.querySelector('.popup__input_title')
const addPopupLinkInput = addPopup.querySelector('.popup__input_link')
const addPopupForm = addPopup.querySelector('.popup__add-form')

const profile = document.querySelector('.profile')

const addButton = profile.querySelector('.profile__add-button')
const profileEditButton = profile.querySelector('.profile__edit-button')
const profileHeader = profile.querySelector('.profile__header')
const profileSubheader = profile.querySelector('.profile__subheader')

const photoGrid = document.querySelector('.photo-grid')

const renderElements = () => {
  initialCards.forEach((item) => {
    const card = new Card(item)
    const cardElement = card.generateCard();
    photoGrid.append(cardElement);
  });
};

const addUserCard = () => {
  const item = {
    name: addPopupTitleInput.value, 
    link: addPopupLinkInput.value,
    value: addPopupTitleInput.value
  }
  const card = new Card(item)
  const cardElement = card.generateCard();
  photoGrid.prepend(cardElement);
}

renderElements();

// Делаем видимыми/невидимыми попапы добавлением класса

const openPopup = (popupName) => {
  popupName.classList.add('popup_opened')
  addEscListener()
}

const closePopup = (popupName) => {
  removeEscListener()
  popupName.classList.remove('popup_opened')
}

const closePopupOnEsc = (event) => {
  if (event.key === "Escape") { 
    closePopup(document.querySelector('.popup_opened'))
  }
}

// Закрываем попапы при нажатии на "overlay" или "крестик"

allPopups.forEach(popup => popup.addEventListener('mousedown', (event) => { 
if (event.target.classList.contains('popup__close-button') || 
    event.target == event.currentTarget) { 
    closePopup(event.currentTarget) 
  }
}))

// При сабмите формы добавления, убираем ее с экрана и вызываем функцию добавления карточки

const addFormSubmitHandler = (event) => {
  event.preventDefault()
    closePopup(addPopup)
    addUserCard()
}

// При сабмите формы редактирования профиля убираем ее с экрана и добавляем значения полей в нужные места

const editFormSubmitHandler = (event) => {
  event.preventDefault()
  profileHeader.textContent = editPopupNameInput.value
  profileSubheader.textContent = editPopupJobInput.value
  closePopup(editPopup)
}

// Вставляем значения в инпуты профайла

const addInputValue = (popupName) => {
  editPopupNameInput.value = profileHeader.textContent
  editPopupJobInput.value = profileSubheader.textContent
  enableValidation(config)
}

// Очищаем инпуты

const clearInputs = (popupName) => {
  addPopupForm.reset()
  enableValidation(config)
}

// Слушатели событий

addButton.addEventListener('click', () => {
  clearInputs(addPopup)
  openPopup(addPopup)
})

profileEditButton.addEventListener('click', () => {
  addInputValue(editPopup)
  openPopup(editPopup)
})

editPopupForm.addEventListener('submit', editFormSubmitHandler)
addPopupForm.addEventListener('submit', addFormSubmitHandler)

export const addEscListener = () => {
  document.addEventListener('keydown', closePopupOnEsc)
}

export const removeEscListener = () => {
  document.removeEventListener('keydown', closePopupOnEsc)
}

// class Popup {
//   constructor (popupType) {
//     this._popupType = popupType
//   }
  
//   handleOpenPopup() {
//     popupElement.querySelector('.popup__image').src = this._link
//     popupElement.querySelector('.popup__caption').textContent = this._name
//     popupElement.querySelector('.popup__image').alt = this._alt
//     popupElement.classList.add('popup_opened');
//   }

//   _handleClosePopup() {
//     popupElement.classList.remove('popup_opened');
//   }
// }

// popupOpenButtons.forEach(popupOpenButton => { 
//   popupOpenButton.addEventListener('click', () => {
//   if (event.target.classList.contains('profile__edit-button')) {
//     const getPopup = new Popup(editPopup)
//     // addInputValue(editPopup)
//     getPopup.handleOpenPopup()
//   }
//   // if (event.target.classList.contains('profile__add-button')) {}
//   //   const getPopup = new Popup(addPopup)
//   //   clearInputs(addPopup)
//   //   getPopup._handleOpenPopup(editPopup)
//   })
// })

// Записываем в переменную все формы на странице, для каждой формы делаем отмену дефолтного поведения на submit передаем форму в функцию установки обработчиков на инпуты.

// class Popup extends Card {
//   _setEventListeners() {
//     this._element.closest('.popup').addEventListener('click', () => {
//       if (event.target == event.currentTarget)
//       super._handleClosePopup(event.currentTarget);
//     });
//   }
// }

// Сбрасываем ошибки в случае если клиент закрыл ошибочную форму и открыл опять

// const resetInputsErrors = (popupName, config) => {
//   const formElement = popupName.querySelector(config.formSelector)
//   const inputElements = popupName.querySelectorAll(config.inputSelector)
//   const inputsList = Array.from(inputElements)
//   inputElements.forEach(inputElement => {
//       _hideInputError(formElement, inputElement, config)
//     })
//   const buttonElement = popupName.querySelector(config.submitButtonSelector)
//   _toggleButtonState(inputsList, buttonElement, config)
// }