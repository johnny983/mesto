// import photoGridOlkhon from './../images/photo-grid-olkhon.jpg'
// import photGridEbrus from './../images/photo-grid-elbrus.jpg'
// import photGridDombai from './../images/photo-grid-dombai.jpg'
// import photoGridKamchatka from './../images/photo-grid-kamchatka.jpg'
// import photoGridKlin from './../images/photo-grid-klin.jpg'
// import photoGridKhibiny from './../images/photo-grid-khibiny.jpg'

// export const initialCards = [
//     {name: 'Ольхон', 
//     link: photoGridOlkhon,
//     alt: 'Каменная глыба посреди замерзжего озера'},
//     {name: 'Эльбрус', 
//     link: photGridEbrus,
//     alt: 'Вид на гору издали на закате солнца'},
//     {name: 'Домбай',
//     link: photGridDombai,
//     alt: 'Горные вершины Домбая'},
//     {name: 'Камчатка',
//     link: photoGridKamchatka,
//     alt: 'Снежная горная вершина с высоты птичьего полета'},
//     {name: 'Клин',
//     link: photoGridKlin,
//     alt: 'Заброшенная здание церкви в поле'},
//     {name: 'Хибины',
//     link: photoGridKhibiny,
//     alt: 'Заснеженные горные склоны'}
//   ];

export const config = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }

export const editPopup = document.querySelector('.popup_edit')
export const editPopupNameInput  = editPopup.querySelector('.popup__input_name')
export const editPopupJobInput = editPopup.querySelector('.popup__input_job')

export const addPopup = document.querySelector('.popup_add')
export const addPopupTitleInput = addPopup.querySelector('.popup__input_title')
export const addPopupLinkInput = addPopup.querySelector('.popup__input_link')

export const avatarPopup = document.querySelector('.popup_avatar')
export const avatarPopupLinkInput = avatarPopup.querySelector('.popup__input_link')

export const confirmPopupButton = document.querySelector('.confirm_button')

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