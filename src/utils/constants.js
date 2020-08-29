export const config = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }

export const editPopup = document.querySelector('.popup_edit')
export const editPopupButton = editPopup.querySelector('.popup__button')
export const editPopupNameInput  = editPopup.querySelector('.popup__input_name')
export const editPopupJobInput = editPopup.querySelector('.popup__input_job')

export const addPopup = document.querySelector('.popup_add')
export const addPopupButton = addPopup.querySelector('.popup__button')
export const addPopupTitleInput = addPopup.querySelector('.popup__input_title')
export const addPopupLinkInput = addPopup.querySelector('.popup__input_link')

export const avatarPopup = document.querySelector('.popup_avatar')
export const avatarPopupButton = avatarPopup.querySelector('.popup__button')
export const avatarPopupLinkInput = avatarPopup.querySelector('.popup__input_link')

export const confirmPopup = document.querySelector('.popup_confirm')
export const confirmPopupButton = confirmPopup.querySelector('.confirm_button')

export const profile = document.querySelector('.profile')
export const addCardButton = profile.querySelector('.profile__add-button')
export const profileEditButton = profile.querySelector('.profile__edit-button')
export const profileHeader = profile.querySelector('.profile__header')
export const profileSubheader = profile.querySelector('.profile__subheader')
export const profileImage = profile.querySelector('.profile__image')

export const photoGrid = document.querySelector('.photo-grid')
export const photoGridTemplate = '.photo-grid__template'

export const apiToken = '54532ad3-7188-4e99-8465-19f8ff7a677f'
export const userId = '227e883fa92ed0ace0785424'