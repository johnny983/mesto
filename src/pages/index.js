"use strict"

import './index.css'
import { config, addPopupTitleInput, addPopupLinkInput, 
addCardButton, profileEditButton, photoGrid, photoGridTemplate, 
initialCards, editPopupNameInput, editPopupJobInput } from '../utils/constants.js'
import Card from '../scripts/Card.js'
import Section from '../scripts/Section.js'
import FormValidator from '../scripts/FormValidator.js'
import PopupWithImage from '../scripts/PopupWithImage.js'
import PopupWithForm from '../scripts/PopupWithForm.js'
import UserInfo from '../scripts/UserInfo.js'


// Находим элементы в DOM


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

addCardButton.addEventListener('click', () => {
    const newCardPopup = new PopupWithForm({ popupSelector: '.popup_add',  handleFormSubmit: () => {
      event.preventDefault()
      addUserCard()
      newCardPopup.close()
    }
  })
  
  newCardPopup.open()

  const ValidatedForm = new FormValidator(config, '.popup__add-form')
      ValidatedForm.enableValidation()
})

profileEditButton.addEventListener('click', () => {

  const userInfo = new UserInfo ({ userName: '.profile__header', userJob: '.profile__subheader' })
    editPopupNameInput.value = userInfo.getUserInfo.name
    editPopupJobInput.value = userInfo.getUserInfo.job

  const ValidatedForm = new FormValidator(config, '.popup__edit-form')
      ValidatedForm.enableValidation()

  const userPopup = new PopupWithForm({ popupSelector: '.popup_edit',  handleFormSubmit: () => {
      event.preventDefault()
      userInfo.setUserInfo()
      userPopup.close()
    }
  })
  userPopup.open()
})