"use strict"

import './index.css'
import {
  config, addPopupTitleInput, addPopupLinkInput,
  addCardButton, profileEditButton, photoGrid, photoGridTemplate,
  editPopupNameInput, editPopupJobInput, profileHeader, avatarPopupLinkInput,
  profileSubheader, profileImage, apiToken, userId, editPopupButton, avatarPopupButton, addPopupButton
} from '../utils/constants.js'
import Card from '../scripts/Card.js'
import Section from '../scripts/Section.js'
import FormValidator from '../scripts/FormValidator.js'
import PopupWithImage from '../scripts/PopupWithImage.js'
import PopupWithForm from '../scripts/PopupWithForm.js'
import PopupConfirm from '../scripts/PopupConfirm.js'
import UserInfo from '../scripts/UserInfo.js'
import Api from '../scripts/Api.js'

const api = new Api({
  baseURL: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: apiToken,
    'Content-Type': 'application/json'
  }
})

const getProfileApi = api.getProfileApi('/users/me')
const userInfo = new UserInfo('.profile__header', '.profile__subheader')

getProfileApi.then((user) => {
  userInfo.setUserInfo(user.name, user.about)
  const getUserInfo = userInfo.getUserInfo
  profileHeader.textContent = getUserInfo.name
  profileSubheader.textContent = getUserInfo.about
  profileImage.style.backgroundImage = `url(${user.avatar})`
})
  .catch(error => console.log(error))

const changeAvatarValidation = new FormValidator(config, '.popup__avatar-form')
  changeAvatarValidation.enableValidation()

const changeAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_avatar', handleFormSubmit: () => {
    event.preventDefault()

    const setAvatarApi = api.setAvatarApi('/users/me/avatar', 'PATCH', avatarPopupLinkInput.value)
    setAvatarApi.then(avatarPopupButton.textContent = "Сохранение...")
      .then((result) => { profileImage.style.backgroundImage = `url(${result.avatar})` })
      .then(() => changeAvatarPopup.close())
      .catch(error => console.log(error))
      .finally(() => avatarPopupButton.textContent = "Сохранить")
  }
})

const getCardsApi = api.getCardsApi('/cards')
const confirmCardRemove = new PopupConfirm('.popup_confirm')
const zoomImage = new PopupWithImage('.popup_zoom')
zoomImage.setEventListeners()

Promise.all([getProfileApi, getCardsApi])
  getCardsApi.then((card) => {
    const cardList = new Section({
      items: card,
      renderer: (item) => {
        const card = new Card(item, photoGridTemplate, userId, {
          handleCardClick: () => {
            zoomImage.open(item)
          }
        }, {
          getConfirmPopup: (cardToDelete) => {
            confirmCardRemove.removeCardHandler(() => {
              api.cardRemoveApi(`/cards/${card._item._id}`, 'DELETE')
                .then(() => confirmCardRemove.localCardRemove(cardToDelete))
                .then(() => confirmCardRemove.close())
                .catch(error => console.log(error))
            })
            confirmCardRemove.open()
            confirmCardRemove.setEventListeners()
          }
        }, {
          likeStateSetApi: (method) => {
            api.toggleLikeApi(`/cards/likes/${item._id}`, method)
              .then(result => card.lastCardState(result))
              .catch(error => console.log(error))
          }
        })
        const cardElement = card.generateCard()
        cardList.addItem(cardElement)
      }
    },
      '.photo-grid'
    )
    cardList.renderItems()
  })
  .catch((error) => console.log(error));

// Добавляем пользовательскую карточку

const addUserCard = (item) => {
  const card = new Card(item, photoGridTemplate, userId, {
    handleCardClick: () => {
      zoomImage.open(item)
    }
  }, {
    getConfirmPopup: (cardToDelete) => {
      confirmCardRemove.removeCardHandler(() => {
        api.cardRemoveApi(`/cards/${card._item._id}`, 'DELETE')
          .then(() => confirmCardRemove.localCardRemove(cardToDelete))
          .then(() => confirmCardRemove.close())
          .catch(error => console.log(error))
      })
      confirmCardRemove.open()
      confirmCardRemove.setEventListeners()
    }
  }, {
    likeStateSetApi: (method) => {
      api.toggleLikeApi(`/cards/likes/${item._id}`, method)
        .then(result => card.lastCardState(result))
        .catch(error => console.log(error))
    }
  })
  const cardElement = card.generateCard();
  photoGrid.prepend(cardElement);
}

const newCardPopup = new PopupWithForm({
  popupSelector: '.popup_add', handleFormSubmit: () => {
    event.preventDefault()
    const userCardApi = api.userCardApi('/cards', 'POST', addPopupTitleInput, addPopupLinkInput)

    userCardApi
      .then(addPopupButton.textContent = "Сохранение...")
      .then(card => addUserCard(card))
      .then(() => newCardPopup.close())
      .catch(error => console.log(error))
      .finally(() => addPopupButton.textContent = "Сохранить")
  }
})
newCardPopup.setEventListeners()

const addFormValidator = new FormValidator(config, '.popup__add-form')
addFormValidator.enableValidation()

addCardButton.addEventListener('click', () => {
  newCardPopup.open()
})

const editFormValidator = new FormValidator(config, '.popup__edit-form')
editFormValidator.enableValidation()

const userPopup = new PopupWithForm({
  popupSelector: '.popup_edit', handleFormSubmit: () => {
    event.preventDefault()

    const editProfileInfoApi = api.editProfileInfoApi(
      '/users/me', 'PATCH', editPopupNameInput.value, editPopupJobInput.value)

    editProfileInfoApi.then((data) => {
      profileHeader.textContent = data.name
      profileSubheader.textContent = data.about
    })
      .then(() => editPopupButton.textContent = "Сохранение...")
      .then(() => userPopup.close())
      .catch(error => console.log(error))
      .finally(() => editPopupButton.textContent = "Сохранить")
  }
})

profileEditButton.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo
  editPopupNameInput.value = getUserInfo.name
  editPopupJobInput.value = getUserInfo.about
  userPopup.open()
  userPopup.setEventListeners()
})

profileImage.addEventListener('click', () => {
  changeAvatarPopup.open()
  changeAvatarPopup.setEventListeners()
})