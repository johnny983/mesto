"use strict"

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

const zoomPopup = document.querySelector('.popup_zoom')
const zoomPopupImage = zoomPopup.querySelector('.popup__image')
const zoomPopupCaption = zoomPopup.querySelector('.popup__caption')

const profile = document.querySelector('.profile')

const addButton = profile.querySelector('.profile__add-button')
const profileEditButton = profile.querySelector('.profile__edit-button')
const profileHeader = profile.querySelector('.profile__header')
const profileSubheader = profile.querySelector('.profile__subheader')

const photoGrid = document.querySelector('.photo-grid')
const cardTemplateContent = photoGrid.querySelector('.photo-grid__template').content

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// Из этого массива создаем галерею

const initialCards = [
  {name: 'Ольхон', 
  link: 'images/photo-grid-olkhon.jpg',
  alt: 'Каменная глыба посреди замерзжего озера'},
  {name: 'Эльбрус', 
  link: 'images/photo-grid-elbrus.jpg',
  alt: 'Вид на гору издали на закате солнца'},
  {name: 'Домбай',
  link: 'images/photo-grid-dombai.jpg',
  alt: 'Горные вершины Домбая'},
  {name: 'Камчатка',
  link: 'images/photo-grid-kamchatka.jpg',
  alt: 'Снежная горная вершина с высоты птичьего полета'},
  {name: 'Клин',
  link: 'images/photo-grid-klin.jpg',
  alt: 'Заброшенная здание церкви в поле'},
  {name: 'Хибины',
  link: 'images/photo-grid-khibiny.jpg',
  alt: 'Заснеженные горные склоны'}
];

// !!!!!!!!!! Вы написали cardItem "переменная не используется", но она используется в функциях ниже.

const cardItem = {
  name: addPopupTitleInput.value, 
  link: addPopupLinkInput.value,
  value: addPopupTitleInput.value
}

// Создаем карточку и добавляем путь картинки, альт-текст и название карточки.

const createCard = (cardItem) => {
    const card = cardTemplateContent.cloneNode(true)
    card.querySelector('.photo-grid__image').src = cardItem.link
    card.querySelector('.photo-grid__image').alt = cardItem.alt
    card.querySelector('.photo-grid__caption').textContent = cardItem.name
    return card
  }

// Создаем объект и передаем его для создания карточки

const addCard = (cardItem) => {
  photoGrid.prepend(createCard(cardItem))
}

// Удаляет карточку при нажатии на "мусорку"

const removeCard = (event) => {
  if (event.target.classList.contains('photo-grid__trash-button')) {
    event.target.closest('.photo-grid__item').remove()
  }
}

// Активируем/деактивируем "лайк"

const toggleLike = (event) => {
  if (event.target.classList.contains('photo-grid__like-button')) {
    event.target.classList.toggle('liked')
  }
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

// Закрываем попапы при нажатии "Esc" и вызываем функцию удаления слушателя.

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

// Сбрасываем ошибки в случае если клиент закрыл ошибочную форму и открыл опять

const resetInputsErrors = (popupName, config) => {
  const formElement = popupName.querySelector(config.formSelector)
  const inputElements = popupName.querySelectorAll(config.inputSelector)
  const inputsList = Array.from(inputElements)

  // !!!!!!!!!! Вы написали "inputsList и следует найти этот массив раньше, чтобы использовать для вызова hideInputError"
  // я на всякий случай перенес его вверх к остальным константам, но он используется только для toggleButtonState

  inputElements.forEach(inputElement => {
      hideInputError(formElement, inputElement, config)
    })
  const buttonElement = popupName.querySelector(config.submitButtonSelector)
  toggleButtonState(inputsList, buttonElement, config)
}

// При сабмите формы добавления, убираем ее с экрана и вызываем функцию добавления карточки

const addFormSubmitHandler = (event) => {
  event.preventDefault()
  closePopup(addPopup)
  addCard()
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
  resetInputsErrors(popupName, config)
}

// Очищаем инпуты

const clearInputs = (popupName) => {
  addPopupForm.reset()
  resetInputsErrors(popupName, config)
}

// Добавляем src и описание картинки

const zoomPopupImages = (event) => {
  if (event.target.classList.contains('photo-grid__image')) {
    zoomPopupImage.src = event.target.src
    zoomPopupCaption.textContent = event.target.closest('.photo-grid__item').innerText
    openPopup(zoomPopup)
  }
}

// Собираем галерею карточек с фотографиями на загрузке страницы из массива

initialCards.forEach((cardItem) => {
  photoGrid.append(createCard(cardItem))
})

// Слушатели событий

profileEditButton.addEventListener('click', () => {
  addInputValue(editPopup)
  openPopup(editPopup)
})

addButton.addEventListener('click', () => {
  clearInputs(addPopup)
  openPopup(addPopup)
})

photoGrid.addEventListener('click', zoomPopupImages)
photoGrid.addEventListener('click', toggleLike)
photoGrid.addEventListener('click', removeCard)

editPopupForm.addEventListener('submit', editFormSubmitHandler)
addPopupForm.addEventListener('submit', addFormSubmitHandler)

const addEscListener = () => {
  document.addEventListener('keydown', closePopupOnEsc)
}

const removeEscListener = () => {
  document.removeEventListener('keydown', closePopupOnEsc)
}

enableValidation(config);