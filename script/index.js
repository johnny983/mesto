"use strict"

import { config, initialCards } from './utils.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'

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

// Создаем первичную галерею карточек

const renderElements = () => {
  initialCards.forEach((item) => {
    const card = new Card(item, '.photo-grid')
    const cardElement = card.generateCard();
    photoGrid.append(cardElement);
  });
};

renderElements();

// Добавляем пользовательскую карточку

const addUserCard = () => {
  const item = {
    name: addPopupTitleInput.value, 
    link: addPopupLinkInput.value,
    value: addPopupTitleInput.value
  }
  const card = new Card(item, '.photo-grid')
  const cardElement = card.generateCard();
  photoGrid.prepend(cardElement);
}

// Добавляем слушатели на нажатие клавишы

const addEscListener = () => {
  document.addEventListener('keydown', closePopupOnEsc)
}

const removeEscListener = () => {
  document.removeEventListener('keydown', closePopupOnEsc)
}

// Делаем видимыми/невидимыми попапы добавлением класса

const openPopup = (popupName) => {
  popupName.classList.add('popup_opened')
  addEscListener()
}

const closePopup = (popupName) => {
  removeEscListener()
  popupName.classList.remove('popup_opened')
}

// Вызываем функцию закрытия попапов при нажатии на Esc

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

// Запускаем валидацию формы

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault()
    })
    const inputsList = Array.from(formElement.querySelectorAll(config.inputSelector))
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    const ValidatedForm = new FormValidator(formElement, config)
      inputsList.forEach((inputElement) => {
        ValidatedForm._hideInputError(formElement, inputElement, config)
        });
      ValidatedForm._toggleButtonState(inputsList, buttonElement, config)
      ValidatedForm._setEventListeners(formElement, buttonElement, inputsList, config)
  })
}

// Вставляем значения в инпуты профайла

const addInputValue = () => {
  editPopupNameInput.value = profileHeader.textContent
  editPopupJobInput.value = profileSubheader.textContent
  enableValidation(config)
}

// Очищаем инпуты

const clearInputs = () => {
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