"use strict"

import './index.css'

import {
  config, addPopupTitleInput, addPopupLinkInput,
  addCardButton, profileEditButton, photoGridTemplate, userId,
  editPopupNameInput, editPopupJobInput, profileHeader, apiToken,
  avatarPopupLinkInput, profileSubheader, profileImage,
} from '../utils/constants.js'

import Card from '../components/Card.js'
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupConfirm from '../components/PopupConfirm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

const api = new Api({
  baseURL: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: apiToken,
    'Content-Type': 'application/json'
  }
})

const isLoading = (loading) => {
  const activePopup = document.querySelector('.popup_opened')
  const activePopupButton = activePopup.querySelector('.popup__button')

  activePopupButton.textContent = loading ? 'Сохранение...' : 'Сохранить'

  if (activePopupButton.classList.contains('confirm_button')) {
    activePopupButton.textContent = loading ? 'Удаление...' : 'Да'
  }
} 

const getProfileApi = api.getProfileApi('/users/me')
const userInfo = new UserInfo('.profile__header', '.profile__subheader', '.profile__image')

const getCardsApi = api.getCardsApi('/cards')
const confirmCardRemove = new PopupConfirm('.popup_confirm')
confirmCardRemove.setEventListeners()

const zoomImage = new PopupWithImage('.popup_zoom')
zoomImage.setEventListeners()

Promise.all([getProfileApi, getCardsApi])
.then(data => setData(data))
.catch(error => console.log(error))

  const setData = ([user, card]) => {
    userInfo.setUserInfo(user.name, user.about, user.avatar)
    const getUserInfo = userInfo.getUserInfo
    profileHeader.textContent = getUserInfo.name
    profileSubheader.textContent = getUserInfo.about
    profileImage.style.backgroundImage = getUserInfo.avatar

  const changeAvatarValidation = new FormValidator(config, '.popup__avatar-form')
  changeAvatarValidation.enableValidation()

  const changeAvatarPopup = new PopupWithForm({
    popupSelector: '.popup_avatar', handleFormSubmit: () => {
      event.preventDefault()
      
      isLoading(true)
      const setAvatarApi = api.setAvatarApi('/users/me/avatar', 'PATCH', avatarPopupLinkInput.value)
      setAvatarApi.then((result) => { profileImage.style.backgroundImage = `url(${result.avatar})` })
        .then(() => isLoading(false))
        .catch(error => console.log(error))
        .finally(() => changeAvatarPopup.close())
    }
  })

  changeAvatarPopup.setEventListeners()

  profileImage.addEventListener('click', () => {
    changeAvatarPopup.open()
  })

  const addCard = (item) => {
    const card = new Card(photoGridTemplate, { item, userId,
      handleCardClick: () => {
        zoomImage.open(item)
      },
      getConfirmPopup: (cardToDelete) => {
        confirmCardRemove.removeCardHandler(() => {
          isLoading(true)
          api.cardRemoveApi(`/cards/${card._item._id}`, 'DELETE')
            .then(() => confirmCardRemove.localCardRemove(cardToDelete))
            .then(() => isLoading(false))
            .catch(error => console.log(error))
            .finally(() => confirmCardRemove.close())
        })
        confirmCardRemove.open()
      },
      likeStateSetApi: (method) => {
        api.toggleLikeApi(`/cards/likes/${item._id}`, method)
          .then(result => card.lastCardState(result))
          .catch(error => console.log(error))
      } 
    })
    const cardElement = card.generateCard()
    cardList.addItem(cardElement)
  }

  const cardList = new Section({ items: card, addCard}, '.photo-grid')
  cardList.renderItems()

  const newCardPopup = new PopupWithForm({
    popupSelector: '.popup_add', handleFormSubmit: () => {
      event.preventDefault()

      isLoading(true)
      const userCardApi = api.userCardApi('/cards', 'POST', addPopupTitleInput, addPopupLinkInput)
  
      userCardApi
        .then(card => addCard(card))
        .then(() => isLoading(false))
        .catch(error => console.log(error))
        .finally(() => newCardPopup.close())
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

      isLoading(true)
      const editProfileInfoApi = api.editProfileInfoApi(
        '/users/me', 'PATCH', editPopupNameInput.value, editPopupJobInput.value)

      editProfileInfoApi.then((data) => {
        profileHeader.textContent = data.name
        profileSubheader.textContent = data.about
      })
        .then(() => isLoading(false))
        .catch(error => console.log(error))
        .finally(() => userPopup.close())
    }
  })
  userPopup.setEventListeners()

  profileEditButton.addEventListener('click', () => {
    const getUserInfo = userInfo.getUserInfo
    editPopupNameInput.value = getUserInfo.name
    editPopupJobInput.value = getUserInfo.about
    userPopup.open()
  })
}