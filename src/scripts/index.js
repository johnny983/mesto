"use strict"

import { initialCards, editPopup, editPopupNameInput, editPopupJobInput } from './utils.js'
import Card from './Card.js'
import Section from './Section.js'
import FormValidator from './FormValidator.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'
import '../pages/index.css'

// Находим элементы в DOM
const addPopup = document.querySelector('.popup_add')
const addPopupTitleInput = addPopup.querySelector('.popup__input_title')
const addPopupLinkInput = addPopup.querySelector('.popup__input_link')

const profile = document.querySelector('.profile')
const addButton = profile.querySelector('.profile__add-button')
const profileEditButton = profile.querySelector('.profile__edit-button')

const photoGrid = document.querySelector('.photo-grid')
const photoGridTemplate = '.photo-grid__template'

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.photo-grid__template', { handleCardClick: () => {
      const zoomImage = new PopupWithImage('.popup_zoom', item)
        zoomImage.open()
    }
  })
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    }
  },
  '.photo-grid'
)

cardList.renderItems();

// Добавляем пользовательскую карточку

const addUserCard = () => {
  const item = {
    name: addPopupTitleInput.value, 
    link: addPopupLinkInput.value,
    alt: addPopupTitleInput.value
  }
  
    const card = new Card(item, photoGridTemplate, { handleCardClick: () => {
      const zoomImage = new PopupWithImage('.popup_zoom', item)
      zoomImage.open()
    }
  })
  const cardElement = card.generateCard();
  photoGrid.prepend(cardElement);
}

addButton.addEventListener('click', () => {
    const newPopup = new PopupWithForm({ popupSelector: '.popup_add',  handleFormSubmit: () => {
      event.preventDefault()
      addUserCard()
      newPopup.close()
    }
  })
  newPopup.open()
})

profileEditButton.addEventListener('click', () => {
    const userInfo = new UserInfo ({ userName: '.profile__header', userJob: '.profile__subheader' })
      editPopupNameInput.value = userInfo.getUserInfo.name
      editPopupJobInput.value = userInfo.getUserInfo.job
    const newPopup = new PopupWithForm({ popupSelector: '.popup_edit',  handleFormSubmit: () => {
      event.preventDefault()
      userInfo.setUserInfo()
      newPopup.close()
    }
  })
  newPopup.open()
})

// Запускаем валидацию формы

export const enableValidation = (config) => {
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